import { Router } from "express";
import { getShortUrl, getUrlId, postUrl } from "../controllers/url.js";
import { authValidation } from "../middlewares/authMid.js";
import validateSchema from "../middlewares/schemaValidation.js";
import {
  getShortUrlMid,
  getUrlIdMid,
  postUrlMid,
} from "../middlewares/urlMid.js";
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
router.get("/urls/open/:shortUrl", getShortUrlMid, getShortUrl);
export default router;
