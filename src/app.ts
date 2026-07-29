import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import restaurantRoutes from "./modules/restaurants/restaurant.routes.js";
import menuRoutes from "./modules/menu/menu.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(
  "/api/restaurants",
  restaurantRoutes
);
app.use(
  "/api/menu",
  menuRoutes
);
export default app;