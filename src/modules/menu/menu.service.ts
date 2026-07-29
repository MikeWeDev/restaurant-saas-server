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
      name: name,
      restaurantId: restaurant.id
    }
  });

  return category;
}