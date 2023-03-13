import { Manager } from "../../controllers/cart.controller.js";
import { productsSchema } from "../../models/products.model.js";

export class ProductosDaoMongo extends Manager {
  constructor() {
    super(productsSchema);
  }
}
