import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: { type: String, require: true },
    name: { type: String, require: true },
    products: { type: Array, require: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const cartSchema = new model("carritos", schema);
