import { Router } from "express";
import authenticationRouter from "./authentication.route.js"
import orderRouter from "./order.route.js";
import { usersMiddleware } from "../middlewares/users.middleware.js";
const router = Router();

router.use("/authentication", authenticationRouter);

router.use("/order", usersMiddleware, orderRouter);
export default router;