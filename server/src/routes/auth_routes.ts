import { Router } from "express";
import { auth_controller } from "../controllers/";
import { verifyIfUserExists } from "../middlewares/auth_middleware";

const router = Router();

// Users routes
router.post("/signup", verifyIfUserExists, auth_controller.signup);
router.post("/login", verifyIfUserExists, auth_controller.login);
router.post("/logout", auth_controller.logout);

export default router;
