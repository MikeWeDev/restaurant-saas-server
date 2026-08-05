import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import restaurantRoutes from "./modules/restaurants/restaurant.routes.js";
import menuRoutes from "./modules/menu/menu.routes.js";
import ingredientRoutes from "./modules/ingredient/ingredient.route.js";
import publicMenuRoutes from "./modules/public-menu/public-menu.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/public",
  publicMenuRoutes
);

app.use("/api/auth", authRoutes);
app.use(
  "/api/restaurants",
  restaurantRoutes
);
app.use(
  "/api/menu",
  menuRoutes
);

app.use(
  "/api/ingredient",
  ingredientRoutes
);
export default app;