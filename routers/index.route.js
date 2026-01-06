import { Router } from "express";
import authenticationRouter from "./authentication.route.js";
import orderRouter from "./order.route.js";
import serviceRouter from "./service.route.js";
import detergentsRouter from "./detergents.route.js";
import fabricSoftenersRouter from "./fabric-softeners.route.js";
import clothingItemRouter from "./clothing-items.routes.js";
import laundryPackageRouter from "./laundryPackage.route.js";
import laundryPackageOrderRouter from "./laundryPackageOrder.route.js";
import adminRoutes from "./admin.route.js";

import { usersAuthMiddleware } from "../middlewares/users.middleware.js";
const router = Router();

router.use("/authentication", authenticationRouter);

router.use("/order", usersAuthMiddleware, orderRouter);
router.use("/service", serviceRouter);
router.use("/detergents", detergentsRouter);
router.use("/fabricSofteners", fabricSoftenersRouter);
router.use("/clothingItem", clothingItemRouter);
router.use("/", laundryPackageRouter);
router.use("/laundry-package-order", usersAuthMiddleware, laundryPackageOrderRouter);
router.use("/admin",adminRoutes);

export default router;
