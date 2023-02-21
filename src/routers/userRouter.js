import { Router } from "express";
import { signIn, signUp } from "../controllers/user.js";
import validateSchema from "../middlewares/schemaValidation.js";
import { signInValidation } from "../middlewares/userMid.js";
import { signInSchema } from "../models/userSchemas.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", validateSchema(signInSchema), signInValidation, signIn);

export default router;
