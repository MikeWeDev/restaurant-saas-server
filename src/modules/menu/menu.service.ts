import prisma from "../../config/database.js";

export async function createCategoryService(
  name: string,
  userId: string
) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId
    }
  });

  if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }

  const category = await prisma.category.create({
    data: {
      name,
      restaurantId: restaurant.id
    }
  });

  return category;
}

export async function getCategoriesService(userId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId
    }
  });

  if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }

  const categories = await prisma.category.findMany({
    where: {
      restaurantId: restaurant.id
    }
  });

  return categories;
}

export async function updateCategoryService(
  id: string,
  name: string,
  userId: string
) {
  
    const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId
    }
  });

  if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }

  const result = await prisma.category.updateMany({
    where: {
      id: id,
      restaurantId: restaurant.id
    },
    data: {
      name: name
    }
  });

  if (result.count === 0) {
    throw new Error("Category not found or you do not have permission to update it");
  }

  return result;
}

export async function deleteCategoryService( id: string,userId: string){
const restaurant = await prisma.restaurant.findFirst({
  where:{
    ownerId: userId
  }
});

 if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }

  const result = await prisma.category.deleteMany({
    where: {
      id,
      restaurantId: restaurant.id
    }
  });

  if (result.count === 0) {
    throw new Error("Category not found or you do not have permission to delete it");
  }

  return result;
}
export async function createMenuItemService(
  name: string,
  description: string,
  price: number,
  categoryId: string,
  userId: string
) {

  // 1. Find the restaurant owned by the logged-in admin
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId
    }
  });


  if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }


  // 2. Check that the category belongs to this restaurant
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      restaurantId: restaurant.id
    }
  });


  if (!category) {
    throw new Error(
      "Category not found or does not belong to your restaurant"
    );
  }


  // 3. Create menu item inside that category
  const menuItem = await prisma.menuItem.create({
    data: {
      name,
      description,
      price,
      categoryId: category.id
    }
  });


  return menuItem;
}

export async function updateMenuItemService(
 id: string,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  userId: string
){
 const restaurant = await prisma.restaurant.findFirst({
  where: {
    ownerId: userId
  }
});
 if (!restaurant) {
    throw new Error("Restaurant not found for the user");
  }
  const menuItem = await prisma.menuItem.findFirst({
  where: {
    id: id,
    category: {
      restaurantId: restaurant.id
    }
  }
});
if (!menuItem) {
  throw new Error(
    "Menu item not found or you do not have permission to update it"
  );
}
const updatedMenuItem = await prisma.menuItem.update({
  where: {
    id: id
  },
  data: {
    name,
    description,
    price,
    categoryId
  }
});
return updatedMenuItem;
}