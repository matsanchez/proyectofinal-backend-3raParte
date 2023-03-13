import { Manager } from "../../controllers/cart.controller.js";
import { cartSchema } from "../../models/cart.model.js";

export class CarritosDaoMongo extends Manager {
  constructor() {
    super(cartSchema);
  }
}
