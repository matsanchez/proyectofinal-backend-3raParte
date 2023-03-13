import loggerApp from "../utils/logger.utils.js";

class OrderPersistence {
  constructor(table) {
    this._table = table;
  }

  async createOrder(user, products, total) {
    try {
      const order = await this._table.create({
        name: user.user.name,
        email: user.user.username,
        products: products,
        total: total,
      });
      return order;
    } catch (error) {
      loggerApp.error(error);
    }
  }
  async getById(id_order) {
    try {
      return await this._table.findById({ _id: id_order }).lean();
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default OrderPersistence;
