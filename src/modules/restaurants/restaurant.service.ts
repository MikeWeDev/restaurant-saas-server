import prisma from "../../config/database.js";

export async function createRestaurant(
  name: string,
  address: string | undefined,
  phone: string | undefined,
  ownerId: string
) {
  const restaurant = await prisma.restaurant.create({
    data: {
      name,
      ownerId,

      ...(address && {
        address,
      }),

      ...(phone && {
        phone,
      }),
    },
  });

  return restaurant;
}

export async function getMyRestaurant(
  ownerId: string
) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId,
    },
  });

  return restaurant;
}

export async function getAllRestaurants() {
  return prisma.restaurant.findMany();
}

export async function updateMyRestaurant(
  ownerId: string,
  data: {
    name?: string;
    address?: string;
    phone?: string;
  }
) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const updatedRestaurant = await prisma.restaurant.update({
    where: {
      id: restaurant.id,
    },
    data,
  });

  return updatedRestaurant;
}