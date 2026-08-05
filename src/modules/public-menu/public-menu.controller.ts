import { Request, Response } from "express";
import {
  getPublicCategoriesService
} from "./public-menu.service.js";


export async function getPublicCategories(
  req: Request,
  res: Response
) {
  try {

    const { restaurantId } = req.params;


    const categories =
      await getPublicCategoriesService(
        restaurantId as string
      );


    res.status(200).json({
      message: "Categories fetched successfully",
      categories
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