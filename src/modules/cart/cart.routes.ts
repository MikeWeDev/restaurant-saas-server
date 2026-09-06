import { Router } from "express";
import { getOrCreateCart,addCartItem,updateCartItem,removeCartItem,placeOrder} from "./cart.controller.js";

const router = Router();

router.get(
  "/table/:qrCode",
  getOrCreateCart
);

router.post(
  "/table/:qrCode/items",
  addCartItem
);
router.patch(
  "/table/:qrCode/items/:cartItemId",
  updateCartItem
)

router.delete(
  "/table/:qrCode/items/:cartItemId",
  removeCartItem
);

router.post(
  "/table/:qrCode/orders",
  placeOrder
);

export default router;