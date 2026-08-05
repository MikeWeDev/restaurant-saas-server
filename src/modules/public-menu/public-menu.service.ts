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