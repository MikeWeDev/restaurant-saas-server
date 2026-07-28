import { Router } from "express";
import {
  create,
  getAllRestaurants,
  getMyRestaurant,
  updateMyRestaurant,
  deleteMyRestaurant,
} from "./restaurant.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  getAllRestaurants
);

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  create
);

router.get(
  "/me",
  authenticate,
  authorize(Role.ADMIN),
  getMyRestaurant
);
router.patch(
  "/me",
  authenticate,
  authorize(Role.ADMIN),
  updateMyRestaurant
);
router.delete(
  "/me",
  authenticate,
  authorize(Role.ADMIN),
  deleteMyRestaurant
);
export default router;