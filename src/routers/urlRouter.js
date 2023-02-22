import { Router } from "express";
import { getUrlId, postUrl } from "../controllers/url.js";
import { authValidation } from "../middlewares/authMid.js";
import validateSchema from "../middlewares/schemaValidation.js";
import { getUrlIdMid, postUrlMid } from "../middlewares/urlMid.js";
import { postUrlSchema } from "../models/urlSchema.js";

const router = Router();

router.post(
  "/urls/shorten",
  authValidation,
  validateSchema(postUrlSchema),
  postUrlMid,
  postUrl
);

router.get("/urls/:id", getUrlIdMid, getUrlId);

export default router;
