import db from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token is missing");

  try {
    const result = await db.query(
      `
        SELECT * FROM sessions
        WHERE token = $1
        `,
      [token]
    );

    const session = result.rows[0];

    if (!session)
      return res.status(401).send("Token is invalid or has expired");

    res.locals.session = session;

    res.status(200).send(session);
  } catch (error) {
    res.status(500).send(error);
  }
}
