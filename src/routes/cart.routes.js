import { Router } from "express";
import { logger } from "../middlewares/loggers.middleware.js";
import { auth } from "../middlewares/middlewares.js";
import CartController from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter
  .get("/", logger, auth, CartController.getAll)
  .post("/:id_cart/products/:id_prod", logger, CartController.addProdToCart)
  .post("/:id_cart/products/:id_prod/delete", logger, CartController.deleteProdToCart);

export default cartRouter;
