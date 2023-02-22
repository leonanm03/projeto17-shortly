import { nanoid } from "nanoid";
import db from "../config/database.js";

export async function postUrlMid(req, res, next) {
  const { url } = req.body;
  const { userId } = res.locals.session;
  try {
    const shortUrl = nanoid(10);

    res.locals.urlsShorten = {
      userId,
      url,
      shortUrl,
    };

    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getUrlIdMid(req, res, next) {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
        SELECT id, "shortUrl", url FROM urls
        WHERE id = $1
      `,
      [id]
    );

    const absentUrl = result.rowCount === 0;
    if (absentUrl) return res.status(404).send("url missing");

    const foundUrl = result.rows[0];

    res.locals.foundUrl = foundUrl;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
