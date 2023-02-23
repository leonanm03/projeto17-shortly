import { Router } from "express";
import {
  deleteUrlId,
  getShortUrl,
  getUrlId,
  postUrl,
} from "../controllers/url.js";
import { authValidation } from "../middlewares/authMid.js";
import validateSchema from "../middlewares/schemaValidation.js";
import {
  deleteUrlIdMid,
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
router.delete("/urls/:id", authValidation, deleteUrlIdMid, deleteUrlId);

export default router;
