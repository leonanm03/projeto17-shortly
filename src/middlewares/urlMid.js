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

export async function getShortUrlMid(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const result = await db.query(
      `
        SELECT url FROM urls
        WHERE "shortUrl" = $1
      `,
      [shortUrl]
    );

    const absentUrl = result.rowCount === 0;
    if (absentUrl) return res.status(404).send("url missing");

    await db.query(
      `
      UPDATE urls
      SET "visitCount" = "visitCount" + 1
      WHERE "shortUrl" = $1;
      `,
      [shortUrl]
    );

    const foundUrl = result.rows[0].url;

    res.locals.foundUrl = foundUrl;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function deleteUrlIdMid(req, res, next) {
  const { userId } = res.locals.session;
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM urls WHERE id = $1;", [id]);

    const absentUrl = result.rowCount === 0;
    if (absentUrl) return res.status(404).send();

    const foundUrl = result.rows[0];

    const notOwner = userId !== foundUrl.userId;
    if (notOwner) return res.status(401).send();

    res.locals.urlId = foundUrl.id;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
