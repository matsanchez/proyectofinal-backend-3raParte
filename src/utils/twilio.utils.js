import twilio from "twilio";
import dotenv from "dotenv";
import loggerApp from "../utils/logger.utils.js";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const sendSMS = async (phone) => {
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: "Su pedido fue recibido y se encuentra en proceso. Gracias por confiar en nosotros!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    loggerApp.info(message);
  } catch (error) {
    loggerApp.error(error);
  }
};
