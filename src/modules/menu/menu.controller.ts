import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  createMenuItemService
} from "./menu.service.js";
import id from "zod/v4/locales/id.js";

export async function createCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {

    const { name } = req.body;

    const userId = req.user.userId;

    const category = await createCategoryService(
      name,
      userId
    );

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch(error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}

export async function getCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.user.userId;
    const categories = await getCategoriesService(userId);

    res.status(200).json({
      message: "Categories fetched successfully",
      categories
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

export async function updateCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required"
      });
    }

    const category = await updateCategoryService(id, name, userId);

    res.status(200).json({
      message: "Category updated successfully",
      category
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
export async function deleteCategory(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required"
      });
    }

    const result = await deleteCategoryService(
      id,
      userId
    );

    res.status(200).json({
      message: "Category deleted successfully",
      result
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



export async function createMenuItem( req: Request, res: Response){
  try{
      const {name, description, price} = req.body;
      const userId = req.user.userId;


      const menuItem = await createMenuItemService(name, description, price, userId);

      res.status(201).json({
          message: "Menu item created successfully",
          menuItem
      });   
  }catch(err){
    console.error(err);
    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong"
    });
  }
}