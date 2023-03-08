import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: { type: String, require: true },
    text: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const mensajesSchema = new model("mensajes", schema);
