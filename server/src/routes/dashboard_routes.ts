import { Router } from "express";
import { users_controller } from "../controllers/";

const router = Router();

router.get("/users/all", users_controller.getAllUser); // Admin
router.get("/users/:email", users_controller.getOneUser); // Admin
router.get("/users/", users_controller.getOwnUser); // Anyone
router.delete("/users/:id", users_controller.deleteOneUser); // Admin only
router.delete("/users/", users_controller.deleteOwnUser); // Delete by current user id
router.put("/users/:id", users_controller.updateUser); // Admin only, change role

export default router;
