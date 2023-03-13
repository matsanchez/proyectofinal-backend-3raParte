import { Router } from "express";
import { auth } from "../middlewares/middlewares.js";
import { logger } from "../middlewares/loggers.middleware.js";
import loggerApp from "../utils/logger.utils.js";
import info from "../process/info.process.js";
import { productsSchema } from "../models/products.model.js";

const indexRouter = Router();

indexRouter
  .get("/", logger, auth, async (req, res) => {
    try {
      const products = await productsSchema.find().lean();
      res.render("pages/home", { userLogin: req.user.username, products, idCart: req.user.cart_id });
    } catch (error) {
      loggerApp.error(error);
    }
  })
  .get("/info", logger, (req, res) => {
    res.render("pages/info", { info: info });
  });
export default indexRouter;
