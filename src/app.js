import("./config/mongo.config.js");
import { PORTconfigYargs, MODserver } from "./config/yargs.config.js";
import cluster from "cluster";
import core from "os";
import loggerApp from "./utils/logger.utils.js";
import msgFlash from "connect-flash";
import dontenv from "dotenv";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import compression from "compression";
import userRouter from "./routes/login.routes.js";
import indexRouter from "./routes/index.routes.js";
import profileRouter from "./routes/profile.routes.js";
import productsRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import randomsRouter from "./routes/randoms.routes.js";
import { initializePassport } from "./strategies/passport.strategy.js";
import { mensajesSchema } from "./models/mensajes.model.js";
/* import { productsSchema } from "./models/products.model.js"; */

dontenv.config();

if (PORTconfigYargs === null) {
  PORTconfigYargs = process.env.PORT;
}

if (MODserver.toLowerCase() === "cluster" && cluster.isPrimary) {
  loggerApp.info(`>>>>> 🚀 Server Up! Port: ${PORTconfigYargs} 💻 Server modo: ${MODserver.toLowerCase()}`);
  for (let i = 0; i < core.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  if (MODserver != "cluster") {
    loggerApp.info(`>>>>> 🚀 Server Up! Port: ${PORTconfigYargs} 💻 Server modo: ${MODserver.toLowerCase()}`);
  }
  const app = express();
  const server = app.listen(PORTconfigYargs, () => {
    loggerApp.info(`>>>>> 👼 Proceso N°: ${process.pid}`);
  });
  app.use(compression());
  app.use(express.static("src/public"));
  app.use(express.json());
  app.use(msgFlash());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      key: process.env.MONGO_STORE_KEY,
      secret: process.env.MONGO_STORE_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 600000,
      },
    })
  );
  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
    })
  );
  app.set("views", "./src/public/views");
  app.set("view engine", "hbs");
  app.use("/", indexRouter);
  app.use("/api/auth", userRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/randoms", randomsRouter);
  app.use((req, res) => {
    loggerApp.warn(`ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`);
    res
      .status(404)
      .render("pages/404", { error: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada` });
  });

  const io = new Server(server);

  io.on("connection", async (socket) => {
    loggerApp.info("🔛 Usuario Conectado");

    /*  const products = await productsSchema.find();
  socket.emit("server:loadProducts", products); */

    const loadContent = async () => {
      const logChat = await mensajesSchema.find();
      socket.emit("server:loadMessages", logChat);
    };
    loadContent();

    socket.on("client:newMessage", async (obj) => {
      let message = await mensajesSchema.create(obj);
      io.emit("server:newMessage", message);
    });
  });
}
