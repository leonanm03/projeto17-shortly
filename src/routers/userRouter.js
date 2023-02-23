import { Router } from "express";
import { getMe, signIn, signUp } from "../controllers/user.js";
import { authValidation } from "../middlewares/authMid.js";
import validateSchema from "../middlewares/schemaValidation.js";
import {
  getMeMid,
  signInValidation,
  signUpValidation,
} from "../middlewares/userMid.js";
import { signInSchema, signUpSchema } from "../models/userSchemas.js";

const router = Router();

router.post("/signup", validateSchema(signUpSchema), signUpValidation, signUp);
router.post("/signin", validateSchema(signInSchema), signInValidation, signIn);
router.get("/users/me", authValidation, getMeMid, getMe);

export default router;
