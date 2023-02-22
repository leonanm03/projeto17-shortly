import { nanoid } from "nanoid";

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
