import { Router } from "express";
import { authValidation } from "../middlewares/authMid.js";

const router = Router();

router.post("/urls/shorten", authValidation);

export default router;
