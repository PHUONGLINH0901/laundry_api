import { Router } from "express"
import { createOrder, deleteOrder, getOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/create", createOrder);

router.get("/list", getOrder);

router.delete("/delete/:id", deleteOrder);
export default router;