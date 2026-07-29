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