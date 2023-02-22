import { Router } from "express";
import { postUrl } from "../controllers/url.js";
import { authValidation } from "../middlewares/authMid.js";
import validateSchema from "../middlewares/schemaValidation.js";
import { postUrlMid } from "../middlewares/urlMid.js";
import { postUrlSchema } from "../models/urlSchema.js";

const router = Router();

router.post(
  "/urls/shorten",
  authValidation,
  validateSchema(postUrlSchema),
  postUrlMid,
  postUrl
);

export default router;
