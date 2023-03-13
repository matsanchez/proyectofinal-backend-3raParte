import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, require: true },
    address: { type: String, require: true },
    age: { type: String, require: true },
    phone: { type: String, require: true },
    file: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    cart_id: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userSchema = new model("usuarios", schema);
