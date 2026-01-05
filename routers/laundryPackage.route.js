import express from "express";
import {
  createLaundryPackage,
  getLaundryPackages,
  getLaundryPackageById,
  updateLaundryPackage,
  deleteLaundryPackage,
} from "../controllers/laundryPackage.controller.js";

const router = express.Router();

// /api/client/laundry-packages
router.post("/laundry-packages", createLaundryPackage);
router.get("/laundry-packages", getLaundryPackages);
router.get("/laundry-packages/:id", getLaundryPackageById);
router.put("/laundry-packages/:id", updateLaundryPackage);
router.delete("/laundry-packages/:id", deleteLaundryPackage);

export default router;
