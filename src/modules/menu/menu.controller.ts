import { Request, Response } from "express";
import {createCategoryService} from "./menu.service.js"

export async function createCategory(
  req: Request,
  res: Response
) {
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