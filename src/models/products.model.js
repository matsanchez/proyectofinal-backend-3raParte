import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
});

export const productsSchema = new model("productos", schema);
