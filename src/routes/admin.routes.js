import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  refreshAccessTokenAdmin,
  getCurrentAdmin,
} from "../controllers/admin.controller.js";
import { getAllOrders } from "../controllers/order.controller.js";
import { verifyJWTAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWTAdmin, logoutAdmin);
router.route("/get-admin").get(verifyJWTAdmin, getCurrentAdmin);
router.route("/get-all-orders").get(verifyJWTAdmin, getAllOrders);

router
  .route("/refresh-access-token")
  .post(verifyJWTAdmin, refreshAccessTokenAdmin);

export default router;
