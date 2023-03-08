import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
});

export const productosSchema = new model("productos", schema);
