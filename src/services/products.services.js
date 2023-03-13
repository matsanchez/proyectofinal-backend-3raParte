import { ProductPersist } from "../persistence/index.persistence.js";
import loggerApp from "../utils/logger.utils.js";

const productPersist = new ProductPersist();

class ProductsService {
  constructor() {}

  async findAll() {
    let products = await productPersist.getAll();
    return products;
  }
  async findProductById(id_prod) {
    try {
      let product = await productPersist.getById(id_prod);
      loggerApp.info("Servicios");
      return product;
    } catch (error) {
      loggerApp.error("Servicios", error);
    }
  }
}

export default new ProductsService();
