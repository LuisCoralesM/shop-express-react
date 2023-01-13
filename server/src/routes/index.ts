import express from "express";
import { verifyToken } from "../middlewares/auth_middleware";
import auth_routes from "./auth_routes";
import dashboard_routes from "./dashboard_routes";
import anyone_routes from "./anyone_routes";
import { auth_controller, kms_controller } from "../controllers";

const router = express.Router();

router.use("/auth", auth_routes);
router.use("/dashboard", verifyToken, dashboard_routes);
router.use("/", anyone_routes);

router.post("/auth0/checkAuth0", auth_controller.checkAuth0);

router.post("/kms/encrypt", kms_controller.encryptData);
router.get("/kms/decrypt", kms_controller.decryptData);

export default router;
