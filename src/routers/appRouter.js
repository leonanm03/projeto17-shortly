import { Router } from "express";
import userRouter from "./userRouter.js";
import urlRouter from "./urlRouter.js";

const router = Router();

router.use([userRouter, urlRouter]);

export default router;
