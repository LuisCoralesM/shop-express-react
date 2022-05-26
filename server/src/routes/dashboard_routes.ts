import { Router } from "express";
import {
  users_controller,
  products_controller,
  order_controller,
} from "../controllers/";
import { verifyAdmin } from "../middlewares/auth_middleware";

const router = Router();

router.get("/users/all", verifyAdmin, users_controller.getAllUser); // Admin
router.get("/users/:email", verifyAdmin, users_controller.getOneUser); // Admin
router.get("/users/", users_controller.getOwnUser); // Anyone
router.delete("/users/:id", verifyAdmin, users_controller.deleteOneUser); // Admin only
router.delete("/users/", users_controller.deleteOwnUser); // Delete by current user id
router.put("/users/:id", verifyAdmin, users_controller.updateUser); // Admin only, change role

router.post("/products/", verifyAdmin, products_controller.postProduct); //ADMIN
router.put("/products/:id", verifyAdmin, products_controller.putProduct); // ADMIN
router.delete("/products/:id", verifyAdmin, products_controller.deleteProduct); // ADMIN

router.get("/orders/:id", verifyAdmin, order_controller.getOneOrder); //ADMIN
router.get("/orders/", verifyAdmin, order_controller.getOrders); //ADMIN
router.post("/orders/", verifyAdmin, order_controller.postOrder); //ADMIN
router.put("/orders/:id", verifyAdmin, order_controller.putOrder); //ADMIN

export default router;
