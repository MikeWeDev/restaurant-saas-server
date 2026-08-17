import { Router } from "express";
import { getOrCreateCart,addCartItem } from "./cart.controller.js";

const router = Router();

router.get(
  "/table/:qrCode",
  getOrCreateCart
);

router.post(
  "/table/:qrCode/items",
  addCartItem
);

export default router;