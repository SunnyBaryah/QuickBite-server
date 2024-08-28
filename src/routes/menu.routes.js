import { Router } from "express";
import {
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuItems,
} from "../controllers/menu.controller.js";

const router = Router();
router.route("/add-menu").post(addMenu);
router.route("/update-menu").put(updateMenu);
router.route("/delete-menu").delete(deleteMenu);
router.route("/get-menu-items").get(getMenuItems);

export default router;
