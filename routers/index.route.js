// import { Router } from "express";
// import authenticationRouter from "./authentication.route.js"
// import orderRouter from "./order.route.js";
// import { usersMiddleware } from "../middlewares/users.middleware.js";
// const router = Router();

// router.use("/authentication", authenticationRouter);

// router.use("/order", usersMiddleware, orderRouter);
// export default router;

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

import { usersMiddleware } from "../middlewares/users.middleware.js";
const router = Router();

router.use("/authentication", authenticationRouter);

router.use("/order", usersMiddleware, orderRouter);
router.use("/service", serviceRouter);
router.use("/detergents", detergentsRouter);
router.use("/fabricSofteners", fabricSoftenersRouter);
router.use("/clothingItem", clothingItemRouter);
router.use("/", laundryPackageRouter);
router.use("/", usersMiddleware, laundryPackageOrderRouter);
router.use("/admin",adminRoutes);

export default router;
