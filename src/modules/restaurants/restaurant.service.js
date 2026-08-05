import prisma from "../../config/database.js";
export async function createRestaurant(name, address, phone, ownerId) {
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
export async function getMyRestaurant(ownerId) {
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
export async function deleteMyRestaurant(ownerId) {
    const restaurant = await prisma.restaurant.findFirst({
        where: {
            ownerId,
        },
    });
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    return prisma.restaurant.delete({
        where: {
            id: restaurant.id,
        },
    });
}
export async function updateMyRestaurant(ownerId, data) {
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
//# sourceMappingURL=restaurant.service.js.map