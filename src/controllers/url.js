import db from "../config/database.js";

export async function postUrl(req, res) {
  const { userId, url, shortUrl } = res.locals.urlsShorten;
  try {
    await db.query(
      `
        INSERT INTO urls ("userId", url, "shortUrl")
        VALUES (${userId}, $1, '${shortUrl}');
        `,
      [url]
    );

    const result = await db.query(
      `
        SELECT id,"shortUrl" FROM urls
        WHERE url = $1;
        `,
      [url]
    );

    const shortObject = result.rows[0];

    return res.status(201).send(shortObject);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getUrlId(req, res) {
  const { foundUrl } = res.locals;
  try {
    res.status(200).send(foundUrl);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getShortUrl(req, res) {
  const { foundUrl } = res.locals;
  try {
    res.redirect(foundUrl);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
