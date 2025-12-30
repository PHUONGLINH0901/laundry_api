import express from "express";
const router = express.Router();

import { getDevices } from "../controllers/device_management_controller.js";
import { getRevenues } from "../controllers/total_revenue_controller.js";
import { getAdmins } from "../controllers/admin_controller.js";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orders_management_controller.js";
import { getServices, addService, updateServicePrice } from "../controllers/services_management_controller.js";
import { getUsers, addUser, updateUser, lockUser } from "../controllers/users_management_controller.js";
import { getInventory, addInventoryItem } from "../controllers/inventory_management.js";
import { loginAdmin } from "../controllers/auth_controller.js";
import { validateUserData, validateUserId } from "../middlewares/user_middleware.js";

router.get("/devices", getDevices);
router.get("/revenues", getRevenues);
router.get("/admins", getAdmins);
router.get("/orders", getOrders);
router.get("/services", getServices);
router.get("/users", getUsers);
router.get("/inventory", getInventory);

router.post("/login", loginAdmin);
router.post("/add/orders", createOrder);
router.post("/created/inventory", addInventoryItem);
router.post("/add/services", addService);

router.put("/services/:serviceId", updateServicePrice);
router.put("/orders/:orderId/status", updateOrderStatus);
router.put("/updated/users/:id", validateUserId, updateUser);
router.patch("/users/:id/lock", validateUserId, lockUser);

export default router;