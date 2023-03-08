import("./config/mongo.config.js");
import { PORTconfigYargs } from "./config/yargs.config.js";
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
import randomsRouter from "./routes/randoms.routes.js";
import { initializePassport } from "./strategies/passport.strategy.js";
import { mensajesSchema } from "./models/mensajes.model.js";
import { productosSchema } from "./models/productos.model.js";

dontenv.config();

if (PORTconfigYargs === null) {
  PORTconfigYargs = process.env.PORT;
}

const app = express();
const server = app.listen(PORTconfigYargs, () => {
  console.log(`>>>>> 👼 Proceso N°: ${process.pid}`);
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
app.use("/api/auth/", userRouter);
app.use("/api/profile/", profileRouter);
app.use("/api/products", productsRouter);
app.use("/api/randoms", randomsRouter);
app.use((req, res) => {
  loggerApp.warn(`ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`);
  res.status(404).render("pages/404", { error: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada` });
});

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("🔛 Usuario Conectado");

  const loadContent = async () => {
    const products = await productosSchema.find();
    const logChat = await mensajesSchema.find();
    socket.emit("server:loadProducts", products);
    socket.emit("server:loadMessages", logChat);
  };
  loadContent();

  socket.on("client:newMessage", async (obj) => {
    let message = await mensajesSchema.create(obj);
    io.emit("server:newMessage", message);
  });

  socket.on("client:deleteProduct", async (id) => {
    await productosSchema.deleteOne({ _id: id });
    refreshList();
  });
});
