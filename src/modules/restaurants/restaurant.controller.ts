import { Request, Response } from "express";
import {
  createRestaurant,
  getMyRestaurant as getMyRestaurantService,
  getAllRestaurants as getAllRestaurantsService,
} from "./restaurant.service.js";
import {
  updateMyRestaurant as updateMyRestaurantService
} from "./restaurant.service.js";

export async function create(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      address,
      phone,
    } = req.body;

    const restaurant = await createRestaurant(
      name,
      address,
      phone,
      req.user!.userId
    );

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });

  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}

export async function getMyRestaurant(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await getMyRestaurantService(
      req.user!.userId
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      restaurant,
    });

  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}

export async function getAllRestaurants(
  req: Request,
  res: Response
) {
  try {
    const restaurants = await getAllRestaurantsService();

    res.status(200).json({
      restaurants,
    });
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}

export async function updateMyRestaurant(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await updateMyRestaurantService(
      req.user!.userId,
      req.body
    );

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });

  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}