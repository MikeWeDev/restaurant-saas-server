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