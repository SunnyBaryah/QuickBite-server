import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Menu } from "../models/menu.model.js";
import { asyncHandler } from "../utils/asynHandler.js";

const getMenuItems = asyncHandler(async (req, res) => {
  const canteen = req.query.canteen;
  if (!canteen) {
    const items = await Menu.find();
    res
      .status(200)
      .json(new ApiResponse(200, items, "Menu items of all canteens"));
  } else {
    const items = await Menu.find({ canteen });
    res
      .status(200)
      .json(new ApiResponse(200, items, `Menu items of ${canteen}`));
  }
});

const addMenu = asyncHandler(async (req, res, next) => {
  const payload = req.body.data;
  if (!payload) {
    throw new ApiError(400, "Detail not given");
  }
  const item = await Menu.create(payload);
  res.status(200).json(new ApiResponse(`Item created successfully`, item));
});

const updateMenu = asyncHandler(async (req, res, next) => {
  const payload = req.body.data;
  const id = payload._id;
  const data = await Menu.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  res.status(200).json(new ApiResponse(`update the item`, data));
});

const deleteMenu = asyncHandler(async (req, res, next) => {
  const id = req.body._id;
  await Menu.findByIdAndDelete(id)
    .then((deletedDocument) => {
      if (deletedDocument) {
        console.log("Document deleted:", deletedDocument);
      } else {
        console.log("No document found with that ID");
      }
    })
    .catch((error) => {
      next(error);
    });
});

export { addMenu, updateMenu, deleteMenu, getMenuItems };
