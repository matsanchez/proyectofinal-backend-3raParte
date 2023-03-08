import { Router } from "express";
/* import { fork } from "child_process"; */
import { logger } from "../middlewares/loggers.middleware.js";
import { randomNumbers } from "../process/random.process.js";
const randomsRouter = Router();

randomsRouter.get("/", logger, (req, res) => {
  let cantidad = parseInt(req.query.cant);
  if (isNaN(cantidad) || cantidad === 0) {
    cantidad = 100000000;
  }
  res.render("pages/randoms", { result: randomNumbers(cantidad), cantidad: cantidad });

  /*   let result = fork("./src/process/random.process");
  result.send(cantidad);
  result.on("message", (data) => {
    res.render("pages/randoms", { result: data, cantidad: cantidad });
  }); */
});

export default randomsRouter;
