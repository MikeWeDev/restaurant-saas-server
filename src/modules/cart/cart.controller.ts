import { Request, Response } from "express";
import { getOrCreateCartService,addCartItemService,updateCartItemService,removeCartItemService } from "./cart.service.js";


export async function getOrCreateCart(
  req: Request,
  res: Response
) {
  try {

    const { qrCode } = req.params;

    const cart = await getOrCreateCartService(
      qrCode as string
    );


    res.status(200).json({
      message: "Cart fetched successfully",
      cart
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}

export async function addCartItem(req: Request, res: Response) {
  try {
    const { qrCode } = req.params;
     if (!qrCode || Array.isArray(qrCode)) {
      return res.status(400).json({
        message: "Invalid QR code"
      });
    }

    const {
      menuItemId,
      quantity,
      ingredientIds
    } = req.body;

    const cartItem = await addCartItemService(
      qrCode,
      menuItemId,
      quantity,
      ingredientIds
    );

    res.status(201).json({
      message: "Item added to cart successfully",
      cartItem
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
  }
}

export async function updateCartItem(
  req: Request,
  res: Response
) {
  try{
   const { qrCode, cartItemId } = req.params;
  const { quantity, ingredientIds } = req.body;
  const cartItem = await updateCartItemService(
  qrCode as string,
  cartItemId as string,
  quantity,
  ingredientIds
);
res.status(200).json({
  message: "Cart item updated successfully",
  cartItem
});
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong"
    });
  }
 
}

export async function removeCartItem(
  req: Request,
  res: Response
) {
  try {
    const { qrCode, cartItemId } = req.params;
    await removeCartItemService(
  qrCode as string,
  cartItemId as string
);
res.status(200).json({
  message: "Cart item removed successfully"
});}
catch(err){
    console.log(err);
    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong"
    });
  }
}