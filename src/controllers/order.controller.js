import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asynHandler.js";

const saveOrder = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const payload = req.body.order;
  if (payload.length === 0) {
    throw new ApiError(400, "The cart is empty");
  }
  let menu = [];
  let amount = 0;
  console.log(payload);
  payload.forEach((element) => {
    menu.push({
      item: element.title,
      price: element.price,
      quantity: element.quantity,
    });
    amount += Number(element.price.replace("₹", "") * element.quantity);
  });
  const newOrder = new Order({
    order: menu,
    status: "unverified",
    userId: req.user._id,
    otp: Math.floor(1000 + Math.random() * 9000),
  });
  await newOrder.save();
  res.status(200).json(
    new ApiResponse(
      200,
      {
        paymentLink: `upi://pay?pa=9667210886@ibl&tn='OTP:${newOrder.otp}'&pn=SnapMeal&cu=INR&am=${amount}`,
      },
      "Order Received"
    )
  );
});

const getOrder = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Not authorized!");
  }
  const id = req.user._id;
  const orders = await Order.find({ userId: id });
  //populate picks up the data from the referenced table and fill it in the referencing table
  //similar to left join in SQL
  res.status(200).json(new ApiResponse(200, orders, "All orders fetched"));
});

const getAllOrders = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Not authorized!");
  }
  const orders = await Order.find();
  res.status(200).json(new ApiResponse(200, orders, "All orders fetched"));
});

const updateOrder = asyncHandler(async (req, res) => {
  const payload = req.body.order;
  const id = payload.id;
  const data = await Order.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!data) {
    throw new ApiError(500, "Something went wrong while updating order");
  }
  res.status(200).json(new ApiResponse(200, data, `updated the order`));
});
export { getOrder, updateOrder, saveOrder, getAllOrders };
