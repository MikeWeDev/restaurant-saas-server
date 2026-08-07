import { Request, Response } from "express";
import { getOrCreateCartService } from "./cart.service.js";


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