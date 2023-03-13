import loggerApp from "../utils/logger.utils.js";
import ProductsService from "../services/products.services.js";
import CartService from "../services/cart.services.js";

class CartController {
  constructor() {}

  async getAll(req, res) {
    const products = await CartService.getProductsInCart(req.user.cart_id);
    res.render("pages/cart", { products, idCart: req.user.cart_id });
  }
  async getById(id) {
    try {
      return await this._table.findById({ _id: id });
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async addProdToCart(req, res) {
    try {
      const {
        params: { id_cart, id_prod },
      } = req;
      const product = await ProductsService.findProductById(id_prod);
      await CartService.addProdToCart(id_cart, product);
      res.redirect("/");
    } catch (error) {
      loggerApp.error("Controlador", error);
    }
  }
  async deleteProdToCart(req, res) {
    try {
      const {
        params: { id_cart, id_prod },
      } = req;
      await CartService.deleteProdToCart(id_cart, id_prod);
      res.send("HOLA");
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default new CartController();
