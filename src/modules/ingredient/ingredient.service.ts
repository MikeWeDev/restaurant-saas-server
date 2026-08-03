import prisma from "../../config/database.js";


export async function createIngredientService(
  name: string,
  userId: string
) {

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId
    }
  });


  if (!restaurant) {
    throw new Error(
      "No restaurant is associated with this account"
    );
  }


  const ingredient = await prisma.ingredient.create({
    data: {
      name,
      restaurantId: restaurant.id
    }
  });


  return ingredient;
}