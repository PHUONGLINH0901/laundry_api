import { Router } from "express";
import {
  getServices,
  getAddServices,
} from "../controllers/service.controller.js";

const router = Router();

router.get("/listServices", getServices);
router.get("/listAddServices", getAddServices);

export default router;
