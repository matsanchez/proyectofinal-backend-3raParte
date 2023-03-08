import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: { type: String, require: true },
    products: { type: Array, require: true },
  },
  {
    timestamps: true,
  }
);

export const cartSchema = new model("carrito", schema);
