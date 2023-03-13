import loggerApp from "../utils/logger.utils.js";

class ProductPersistence {
  constructor(table) {
    this._table = table;
  }

  async getAll() {
    return await this._table.find().lean();
  }
  async getById(id_prod) {
    try {
      const result = await this._table.findById({ _id: id_prod });
      loggerApp.info("Persistencia");
      return result;
    } catch (error) {
      loggerApp.error("Persistencia", error);
    }
  }
  async addProdToCart(idProd, idCart) {
    try {
    } catch (error) {
      loggerApp.error(error);
    }
    try {
      let list = [];
      const dataObj = await this.getById(id);
      list.push(...dataObj.productos);
      list.push(params);
      return this._table.findByIdAndUpdate(id, { productos: list });
    } catch (error) {}
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

export default ProductPersistence;
