import ProductPersistence from "./products.persistence.js";
import CartPersistence from "./cart.persistence.js";
import OrderPersistence from "./order.persistence.js";
import { productsSchema } from "../models/products.model.js";
import { cartSchema } from "../models/cart.model.js";
import { orderSchema } from "../models/order.model.js";

export class ProductPersist extends ProductPersistence {
  constructor() {
    super(productsSchema);
  }
}

export class CartPersist extends CartPersistence {
  constructor() {
    super(cartSchema);
  }
}

export class OrderPersist extends OrderPersistence {
  constructor() {
    super(orderSchema);
  }
}
