import { Router } from "express";
import { getFabricSofteners } from "../controllers/fabricSoftener.controller.js";

const router = Router();

router.get("/listFabricSofteners", getFabricSofteners);

export default router;
