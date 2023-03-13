import { CartPersist } from "../persistence/index.persistence.js";
import loggerApp from "../utils/logger.utils.js";

const cartPersist = new CartPersist();

class CartService {
  constructor() {}

  async findCartById(id_cart) {
    let result = await cartPersist.getById(id_cart);
    return result;
  }
  async addProdToCart(id_cart, product) {
    try {
      const result = await cartPersist.addProdToCart(id_cart, product);
      return result;
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async deleteProdToCart(id_cart, id_prod) {
    try {
      const result = await cartPersist.deleteProdToCart(id_cart, id_prod);
      return result;
    } catch (error) {
      loggerApp.error(error);
    }
  }

  async deleteAllProdToCart(id_cart) {
    try {
      await cartPersist.deleteAllProdToCart(id_cart);
      return;
    } catch (error) {
      loggerApp.error(error);
    }
  }

  async getProductsInCart(id) {
    try {
      const data = await cartPersist.getAll(id);
      const result = data[0].products;
      return result;
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default new CartService();
