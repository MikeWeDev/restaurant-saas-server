import prisma from "../../config/database.js";

export async function getOrCreateCartService(
  qrCode: string
) {
  const table = await prisma.table.findUnique({
    where: {
      qrCode
    }
  });

  if (!table) {
    throw new Error("Table not found");
  }

  let cart = await prisma.cart.findFirst({
    where: {
      tableId: table.id
    },
    include: {
      items: {
        include: {
          menuItem: true,
          selectedIngredients: {
            include: {
              ingredient: true
            }
          }
        }
      },
      table: {
        include: {
          restaurant: true
        }
      }
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        tableId: table.id,
        restaurantId: table.restaurantId
      },
      include: {
        items: {
          include: {
            menuItem: true,
            selectedIngredients: {
              include: {
                ingredient: true
              }
            }
          }
        },
        table: {
          include: {
            restaurant: true
          }
        }
      }
    });
  } else if (!cart.restaurantId) {
    cart = await prisma.cart.update({
      where: {
        id: cart.id
      },
      data: {
        restaurantId: table.restaurantId
      },
      include: {
        items: {
          include: {
            menuItem: true,
            selectedIngredients: {
              include: {
                ingredient: true
              }
            }
          }
        },
        table: {
          include: {
            restaurant: true
          }
        }
      }
    });
  }

  return cart;
}
export async function addCartItemService(
  qrCode: string,
  menuItemId: string,
  quantity: number,
  ingredientIds: string[]
) {
  const table = await prisma.table.findUnique({
    where: {
      qrCode
    }
  });

  if (!table) {
    throw new Error("Table not found");
  }

  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: menuItemId
    },
    include: {
      ingredients: true
    }
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  if (!menuItem.isAvailable) {
    throw new Error("Menu item is currently unavailable");
  }

  if (!quantity || quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const allowedIngredientIds = menuItem.ingredients.map(
    (item) => item.ingredientId
  );

  const hasInvalidIngredient = ingredientIds.some(
    (id) => !allowedIngredientIds.includes(id)
  );

  if (hasInvalidIngredient) {
    throw new Error(
      "One or more selected ingredients are not available for this menu item"
    );
  }

  const requiredIngredientIds = menuItem.ingredients
    .filter((item) => item.isRequired)
    .map((item) => item.ingredientId);

  const hasMissingRequiredIngredient = requiredIngredientIds.some(
    (id) => !ingredientIds.includes(id)
  );

  if (hasMissingRequiredIngredient) {
    throw new Error("Required ingredients must be selected");
  }

  const cartItem = await prisma.$transaction(
    async (tx) => {
      let cart = await tx.cart.findFirst({
        where: {
          tableId: table.id
        }
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: {
            tableId: table.id,
            restaurantId: table.restaurantId
          }
        });
      }

      const cartItem = await tx.cartItem.create({
        data: {
          cartId: cart.id,
          menuItemId,
          quantity
        }
      });

      if (ingredientIds.length > 0) {
        await tx.cartItemIngredient.createMany({
          data: ingredientIds.map((ingredientId) => ({
            cartItemId: cartItem.id,
            ingredientId
          }))
        });
      }

      return cartItem;
    },
    {
      timeout: 10000
    }
  );

  return prisma.cartItem.findUnique({
    where: {
      id: cartItem.id
    },
    include: {
      menuItem: true,
      selectedIngredients: {
        include: {
          ingredient: true
        }
      }
    }
  });
}


export async function updateCartItemService(
  qrCode: string,
  cartItemId: string,
  quantity: number,
  ingredientIds: string[]
) {
  const table = await prisma.table.findUnique({
    where: {
      qrCode
    }
  });

  if (!table) {
    throw new Error("Table not found");
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        tableId: table.id
      }
    },
    include: {
      menuItem: {
        include: {
          ingredients: true
        }
      },
      selectedIngredients: true
    }
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  if (!quantity || quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const allowedIngredientIds = cartItem.menuItem.ingredients.map(
    (item) => item.ingredientId
  );

  const hasInvalidIngredient = ingredientIds.some(
    (id) => !allowedIngredientIds.includes(id)
  );

  if (hasInvalidIngredient) {
    throw new Error(
      "One or more selected ingredients are not available for this menu item"
    );
  }

  const requiredIngredientIds = cartItem.menuItem.ingredients
    .filter((item) => item.isRequired)
    .map((item) => item.ingredientId);

  const hasMissingRequiredIngredient = requiredIngredientIds.some(
    (id) => !ingredientIds.includes(id)
  );

  if (hasMissingRequiredIngredient) {
    throw new Error("Required ingredients must be selected");
  }

  const updatedCartItemId = await prisma.$transaction(async (tx) => {
    await tx.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        quantity
      }
    });

    await tx.cartItemIngredient.deleteMany({
      where: {
        cartItemId: cartItem.id
      }
    });

    if (ingredientIds.length > 0) {
      await tx.cartItemIngredient.createMany({
        data: ingredientIds.map((ingredientId) => ({
          cartItemId: cartItem.id,
          ingredientId
        }))
      });
    }

    return cartItem.id;
  });

  return prisma.cartItem.findUnique({
    where: {
      id: updatedCartItemId
    },
    include: {
      menuItem: true,
      selectedIngredients: {
        include: {
          ingredient: true
        }
      }
    }
  });
}


export async function removeCartItemService(
  qrCode: string,
  cartItemId: string
) {
  const table = await prisma.table.findUnique({
    where: {
      qrCode
    }
  });

  if (!table) {
    throw new Error("Table not found");
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        tableId: table.id
      }
    }
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await prisma.cartItem.delete({
    where: {
      id: cartItem.id
    }
  });

  return cartItem;
}