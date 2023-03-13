import loggerApp from "../utils/logger.utils.js";
import OrderService from "../services/order.services.js";
import CartService from "../services/cart.services.js";
import { orderEmail } from "../utils/nodemailer.js";
import { sendSMS } from "../utils/twilio.utils.js";

class OrderController {
  constructor() {}

  async generateOrder(req, res) {
    try {
      const order = await OrderService.generateOrder(req);
      await CartService.deleteAllProdToCart(req.user.cart_id);
      if (order) {
        orderEmail(req.user, order);
        sendSMS(req.user.phone);
      }
      res.redirect(`/api/order/${order._id}`);
    } catch (error) {
      loggerApp.error(error);
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.render("pages/checkout", { order });
    } catch (error) {
      loggerApp.error(error);
    }
  }
}

export default new OrderController();
