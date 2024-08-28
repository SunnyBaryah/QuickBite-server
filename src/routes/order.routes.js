import { Router } from "express";
import {
  getOrder,
  updateOrder,
  saveOrder,
} from "../controllers/order.controller.js";
import { verifyJWT, verifyJWTAdmin } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/get-order").get(verifyJWT, getOrder);
router.route("/update-order").put(updateOrder);
router.route("/save-order").post(verifyJWT, saveOrder);

export default router;
