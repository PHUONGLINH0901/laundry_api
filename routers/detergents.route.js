import { Router } from "express";
import { getDetergents } from "../controllers/detergent.controller.js";

const router = Router();

router.get("/listDetergents", getDetergents);

export default router;
