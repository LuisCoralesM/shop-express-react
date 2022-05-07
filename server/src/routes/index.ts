import express from "express";
import { verifyToken } from "../middlewares/auth_middleware";
import auth_routes from "./auth_routes";
import dashboard_routes from "./dashboard_routes";

const router = express.Router();

router.use("/auth", auth_routes);
router.use("/dashboard", verifyToken, dashboard_routes);

export default router;
