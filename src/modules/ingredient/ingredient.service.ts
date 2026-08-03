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

export async function getIngredientsService(
  userId: string
) {

  // 1. Find restaurant owned by admin
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


  // 2. Get ingredients for this restaurant
  const ingredients = await prisma.ingredient.findMany({
    where: {
      restaurantId: restaurant.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });


  return ingredients;
}

export async function updateIngredientService(
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
    throw new Error(
      "No restaurant is associated with this account"
    );
  }


  const ingredient = await prisma.ingredient.findFirst({
    where: {
      id,
      restaurantId: restaurant.id
    }
  });


  if (!ingredient) {
    throw new Error(
      "Ingredient not found or you do not have permission"
    );
  }


  const updatedIngredient =
    await prisma.ingredient.update({
      where: {
        id
      },
      data: {
        name
      }
    });


  return updatedIngredient;
}

export async function deleteIngredientService(
  id: string,
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


  const ingredient = await prisma.ingredient.findFirst({
    where: {
      id,
      restaurantId: restaurant.id
    }
  });


  if (!ingredient) {
    throw new Error(
      "Ingredient not found or you do not have permission"
    );
  }


  const deletedIngredient =
    await prisma.ingredient.delete({
      where: {
        id
      }
    });


  return deletedIngredient;
}