import { Router } from "express";
import { signIn, signUp } from "../controllers/user.js";
import validateSchema from "../middlewares/schemaValidation.js";
import { signInValidation, signUpValidation } from "../middlewares/userMid.js";
import { signInSchema, signUpSchema } from "../models/userSchemas.js";

const router = Router();

router.post("/signup", validateSchema(signUpSchema), signUpValidation, signUp);
router.post("/signin", validateSchema(signInSchema), signInValidation, signIn);

export default router;
