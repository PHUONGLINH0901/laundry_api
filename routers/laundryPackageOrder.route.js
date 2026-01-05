import express from "express";
import {
  createLaundryPackageOrder,
  getLaundryPackageOrders,
  updateLaundryPackageOrderStatus,
  getOrdersByUser,
  getAvailableLaundryPackages, // Thêm controller mới
} from "../controllers/laundryPackageOrder.controller.js";

const router = express.Router();

// client
router.post("/createLaundryPackageOrder", createLaundryPackageOrder);
router.get("/laundryPackageOrder/:userId", getOrdersByUser);
// ✅ Client route để lấy danh sách packages
router.get("/laundry-packages/available", getAvailableLaundryPackages);
// admin
router.get("/getLaundryPackageOrders", getLaundryPackageOrders);
router.put("/:id/status", updateLaundryPackageOrderStatus);

export default router;
