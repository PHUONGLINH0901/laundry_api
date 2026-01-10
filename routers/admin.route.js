import express from "express";
const router = express.Router();

import { getDevices } from "../controllers/device.management.controller.js";
// import { getRevenues } from "../controllers/total_revenue_controller.js";
import { getAdmins } from "../controllers/authentication.controller.js";
import { getOrder, createOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { getServices, addService, updateServicePrice } from "../controllers/service.controller.js";
import { getUsers, addUser, updateUser, lockUser } from "../controllers/users.controller.js";
import { getInventory, addInventoryItem } from "../controllers/inventory.controller.js";
import { loginAdmin } from "../controllers/authentication.controller.js";
import { validateUserData, validateUserId, usersAuthMiddleware } from "../middlewares/users.middleware.js";

router.get("/devices", getDevices);
// router.get("/revenues", getRevenues);
router.get("/admin", getAdmins);
router.get("/orders", usersAuthMiddleware("admin"),getOrder);
router.get("/services", getServices);
router.get("/users", getUsers);
router.get("/inventory", getInventory);

router.post("/login", loginAdmin);
router.post("/add/orders", createOrder);
router.post("/created/inventory", addInventoryItem);
router.post("/add/services", addService);
router.post("/add/users",usersAuthMiddleware("admin"),validateUserData,addUser);

router.put("/services/:serviceId", updateServicePrice);
router.put("/orders/:orderId/status", updateOrderStatus);
router.put("/updated/users/:id", validateUserId, updateUser);
router.patch("/users/:id/lock", validateUserId, lockUser);

export default router;