import { Request, Response } from "express";
import {
  createIngredientService,
  getIngredientsService,
  updateIngredientService,
  deleteIngredientService
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

export async function getIngredients(
  req: Request,
  res: Response
) {

  try {

    const userId = req.user.userId;


    const ingredients =
      await getIngredientsService(
        userId
      );


    res.status(200).json({
      message: "Ingredients fetched successfully",
      ingredients
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

export async function updateIngredient(
  req: Request,
  res: Response
) {

  try {

    const { id } = req.params;

    const { name } = req.body;

    const userId = req.user.userId;


    const ingredient =
      await updateIngredientService(
        id,
        name,
        userId
      );


    res.status(200).json({
      message: "Ingredient updated successfully",
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

export async function deleteIngredient(
  req: Request,
  res: Response
) {

  try {

    const { id } = req.params;

    const userId = req.user.userId;


    const ingredient =
      await deleteIngredientService(
        id,
        userId
      );


    res.status(200).json({
      message: "Ingredient deleted successfully",
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