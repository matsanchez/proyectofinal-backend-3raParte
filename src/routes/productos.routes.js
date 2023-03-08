import { Router } from "express";
import { logger } from "../middlewares/loggers.middleware.js";

const productsRouter = Router();

productsRouter.get("/", logger, async (req, res) => {
  res.render("pages/products");
});

export default productsRouter;
