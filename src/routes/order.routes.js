import { Router } from "express";
import { logger } from "../middlewares/loggers.middleware.js";
import { auth } from "../middlewares/middlewares.js";
import OrderController from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter
  .get("/", logger, auth, OrderController.getOrderById)
  .get("/:id", logger, auth, OrderController.getOrderById)
  .post("/", logger, auth, OrderController.generateOrder);

export default orderRouter;
