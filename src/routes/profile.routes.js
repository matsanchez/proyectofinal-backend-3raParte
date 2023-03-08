import { Router } from "express";
import { auth } from "../middlewares/middlewares.js";
import { logger } from "../middlewares/loggers.middleware.js";

const profileRouter = Router();

profileRouter.get("/", logger, auth, (req, res) => {
  const { name, age, address, phone, file, username, createdAt } = req.user;
  const user = {
    name: name,
    address: address,
    age: age,
    phone: phone,
    email: username,
    file: file,
    create: createdAt,
  };
  res.render("pages/profile", { profile: user });
});

export default profileRouter;
