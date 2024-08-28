import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  canteen: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
export const Menu = mongoose.model("MenuItem", menuSchema);
