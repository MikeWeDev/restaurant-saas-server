import { Router } from "express";
import { updateOrderStatus,getOrCreateCart,addCartItem,updateCartItem,removeCartItem,placeOrder,getOrderStatus} from "./cart.controller.js";

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

router.get(
  "/orders/:orderId/status",
  getOrderStatus
);

router.patch(
  "/orders/:orderId/status",
  updateOrderStatus
);

export default router;