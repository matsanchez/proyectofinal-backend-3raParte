import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    products: [],
    total: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const orderSchema = new model("pedidos", schema);
