import { Request, Response } from "express";
import { getOrCreateCartService,addCartItemService } from "./cart.service.js";


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