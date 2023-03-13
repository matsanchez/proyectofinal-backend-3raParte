import { OrderPersist } from "../persistence/index.persistence.js";
import CartServices from "./cart.services.js";
import loggerApp from "../utils/logger.utils.js";

const orderPersist = new OrderPersist();

class OrderService {
  constructor() {}

  async generateOrder(user) {
    try {
      const products = await CartServices.getProductsInCart(user.user.cart_id);
      const total = products.reduce((item, _item) => {
        return item + _item.price;
      }, 0);
      const order = await orderPersist.createOrder(user, products, total);
      return order;
    } catch (error) {
      loggerApp.error(error);
    }
  }

  async getOrderById(id_order) {
    try {
      const order = await orderPersist.getById(id_order);
      return order;
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default new OrderService();
