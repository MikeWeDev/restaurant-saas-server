import { Request, Response } from "express";
import {
  createIngredientService
} from "./ingredient.service.js";


export async function createIngredient(
  req: Request,
  res: Response
) {
  try {

    const { name } = req.body;

    const userId = req.user.userId;


    const ingredient =
      await createIngredientService(
        name,
        userId
      );


    res.status(201).json({
      message: "Ingredient created successfully",
      ingredient
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