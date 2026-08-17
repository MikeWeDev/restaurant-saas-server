import prisma from "../../config/database.js";


export async function getPublicCategoriesService(
  restaurantId: string
) {

  const categories = await prisma.category.findMany({
    where: {
      restaurantId
    },
    orderBy: {
      createdAt: "asc"
    }
  });


  return categories;
}

export async function getPublicMenuItemsService(
  categoryId: string
) {

  const menuItems = await prisma.menuItem.findMany({
    where: {
      categoryId,
      isAvailable: true
    },
    orderBy: {
      createdAt: "asc"
    },
    include: {
  category: true
}
  });


  return menuItems;
}

export async function getPublicMenuItemIngredientsService(
  menuItemId: string
) {

  const ingredients =
    await prisma.menuItemIngredient.findMany({

      where: {
        menuItemId
      },

      include: {
        ingredient: true
      }

    });


  return ingredients;
}

export async function getPublicMenuItemService(
  menuItemId: string
) {
  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: menuItemId
    },
    include: {
      category: true,
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  return menuItem;
}