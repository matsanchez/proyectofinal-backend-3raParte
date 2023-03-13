import loggerApp from "../utils/logger.utils.js";
import ProductsService from "../services/products.services.js";

class ProductsController {
  constructor() {}

  async getAll(req, res) {
    let products = await ProductsService.findAll();
    res.render("pages/products", { products });
  }
  async addProdToCart(req, res) {
    try {
      const {
        params: { id_cart, id_prod },
      } = req;
      const product = await ProductsService.getById(id_prod);
      const cart = await CartService.getById(id_cart);
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async deleteProducto(id, idProd) {
    try {
      let list = [];
      let newList = [];
      const dataObj = await this.getById(id);
      list.push(...dataObj.productos);
      for (let i = 0; i <= list.length - 1; i++) {
        if (list[i]._id.toString() != idProd) {
          newList.push(list[i]);
        }
      }
      return this._table.findByIdAndUpdate(id, { productos: newList });
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async updateById(id, params) {
    try {
      return this._table.findByIdAndUpdate(id, { params });
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async deleteById(id) {
    try {
      return this._table.findByIdAndDelete({ _id: id });
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default new ProductsController();
