import { Request, Response } from "express";
import {
  getPublicCategoriesService,
  getPublicMenuItemsService,
  getPublicMenuItemIngredientsService
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

export async function getPublicMenuItems(req: Request, res: Response) {
    try{
 const {categoryId} = req.params;
      const menuItems = await getPublicMenuItemsService(categoryId as string);
      res.status(200).json({
        message: "Menu items fetched successfully",
        menuItems
      });
    }catch(error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
}
}

export async function getPublicMenuItemIngredients(
  req: Request,
  res: Response
) {
  try {

    const { menuItemId } = req.params;

    const ingredients =
      await getPublicMenuItemIngredientsService(
        menuItemId as string
      );


    res.status(200).json({
      message: "Menu item ingredients fetched successfully",
      ingredients
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