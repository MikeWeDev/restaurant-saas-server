import prisma from "../../config/database.js";


export async function getOrCreateCartService(
  qrCode: string
) {

  const table = await prisma.table.findUnique({
    where: {
      qrCode
    }
  });


  if (!table) {
    throw new Error("Table not found");
  }


  let cart = await prisma.cart.findFirst({
    where: {
      tableId: table.id
    },
   include: {
  items: true,
  table: {
    include: {
      restaurant: true
    }
  }
}
  });


  if (!cart) {

    cart = await prisma.cart.create({
      data: {
        tableId: table.id
      },
      include: {
        items: true
      }
    });

  }


  return cart;
}