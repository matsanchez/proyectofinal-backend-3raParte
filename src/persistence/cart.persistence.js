import loggerApp from "../utils/logger.utils.js";

class CartPersistence {
  constructor(table) {
    this._table = table;
  }

  async getAll(id_cart) {
    try {
      return await this._table.find({ _id: id_cart }).lean();
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async getById(id_cart) {
    try {
      return await this._table.findById({ _id: id_cart });
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async addProdToCart(id_cart, product) {
    try {
      let list = [];
      const dataObj = await this.getById(id_cart);
      list.push(...dataObj.products);
      list.push(product);
      return this._table.findByIdAndUpdate(id_cart, { products: list });
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async deleteProdToCart(id_cart, id_Prod) {
    try {
      let list = [];
      let newList = [];
      const dataObj = await this.getById(id_cart);
      list.push(...dataObj.products);
      for (let i = 0; i <= list.length - 1; i++) {
        if (list[i]._id.toString() != id_Prod) {
          newList.push(list[i]);
        }
      }
      return this._table.findByIdAndUpdate(id_cart, { products: newList });
    } catch (error) {
      loggerApp.error(error);
    }
  }

  async deleteAllProdToCart(id_cart) {
    try {
      await this._table.findByIdAndUpdate(id_cart, { products: [] });
      return;
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

export default CartPersistence;
