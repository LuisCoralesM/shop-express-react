import { Router } from "express";
import {
  users_controller,
  products_controller,
  order_controller,
} from "../controllers/";
import { verifyAdmin } from "../middlewares/auth_middleware";

const router = Router();

// USERS
router.get("/users/all", verifyAdmin, users_controller.getAllUser); // Admin
router.get("/users/:email", verifyAdmin, users_controller.getOneUser); // Admin
router.get("/users/", users_controller.getOwnUser); // Anyone
router.delete("/users/:id", verifyAdmin, users_controller.deleteOneUser); // Admin only
router.delete("/users/", users_controller.deleteOwnUser); // Delete by current user id
router.put("/users/:id", verifyAdmin, users_controller.updateUser); // Admin only, change role

// PRODUCTS
router.post("/products/", verifyAdmin, products_controller.postProduct); //ADMIN
router.put("/products/:id", verifyAdmin, products_controller.putProduct); // ADMIN
router.delete("/products/:id", verifyAdmin, products_controller.deleteProduct); // ADMIN

// ORDERS
router.get("/orders/latest/:id", verifyAdmin, order_controller.getLatestOrdersSales); // ADMIN
router.get("/orders/country/", verifyAdmin, order_controller.getOrdersByCountry); //ADMIN
router.get("/orders/:id", verifyAdmin, order_controller.getOneOrder); //ADMIN
router.get("/orders/", verifyAdmin, order_controller.getOrders); //ADMIN
router.post("/orders/", verifyAdmin, order_controller.postOrder); //ADMIN
router.put("/orders/:id", verifyAdmin, order_controller.putOrder); //ADMIN

// ORDERS/SALES STATS
router.post("/stats/orders/dates", verifyAdmin, order_controller.getSalesStatsByDates);
router.get("/stats/orders/total", verifyAdmin, order_controller.getSalesByTotals);
router.post("/stats/orders/", verifyAdmin, order_controller.getSalesByMonth);

// PRODUCTS STATS
router.get("/stats/products/compare/:month", verifyAdmin, products_controller.getTwoProductsStats);
router.get("/stats/products/:id", verifyAdmin, products_controller.getProductSalesStats);

export default router;
