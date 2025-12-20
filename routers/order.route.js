import { Router } from "express"
import { createOrder, getOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/create", createOrder);

router.get("/list", getOrder);
export default router;
//