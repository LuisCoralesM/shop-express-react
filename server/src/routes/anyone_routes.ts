import { Router } from "express";
import { products_controller } from "../controllers/";

const router = Router();

router.get("/products/:id", products_controller.getOneProduct);
router.get("/products/", products_controller.getProducts);

export default router;
