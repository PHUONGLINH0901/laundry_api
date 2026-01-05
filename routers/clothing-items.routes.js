import express from "express";
import { getClothingItems } from "../controllers/clothing.controller.js";

const router = express.Router();

router.get("/listClothingItems/:service_id", getClothingItems);

export default router;
