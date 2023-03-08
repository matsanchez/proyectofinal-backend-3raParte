import { Router } from "express";
import { auth } from "../middlewares/middlewares.js";
import { logger } from "../middlewares/loggers.middleware.js";
import info from "../process/info.process.js";

const indexRouter = Router();

indexRouter
  .get("/", logger, auth, async (req, res) => {
    res.render("pages/home", { userLogin: req.user.username });
  })
  .get("/info", logger, (req, res) => {
    res.render("pages/info", { info: info });
  });
export default indexRouter;
