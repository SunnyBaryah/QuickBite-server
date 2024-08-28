import mongoose, { Schema } from "mongoose";
const orderSchema = new mongoose.Schema({
  order: [
    {
      item: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});
export const Order = mongoose.model("Order", orderSchema);
