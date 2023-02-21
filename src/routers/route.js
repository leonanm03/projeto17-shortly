import { Router } from "express";
import { getTeste } from "../controllers/controller.js";

const router = Router();

router.get("/teste", getTeste);

export default router;
