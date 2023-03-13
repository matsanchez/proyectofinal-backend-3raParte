import { ProductosDaoMongo } from "./productos/productos.dao.mongodb.js";
import { CarritosDaoMongo } from "./carritos/carritos.dao.mongodb.js";

const productosDao = ProductosDaoMongo;
const carritosDao = CarritosDaoMongo;

export { productosDao, carritosDao };
