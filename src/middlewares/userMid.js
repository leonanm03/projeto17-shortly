import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUpValidation(req, res, next) {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const result = await db.query(
      `
        SELECT * FROM users
        WHERE email = $1
        `,
      [email]
    );

    const userAlreadyExists = result.rowCount !== 0;
    if (userAlreadyExists) return res.sendStatus(409);

    // password crypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    res.locals.signUp = {
      name,
      email,
      password: passHash,
    };

    next();
  } catch (error) {
    return res.status(500).send("Server error: " + error);
  }
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await db.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
        `,
      [email]
    );
    const invalidUser = result.rowCount === 0;
    if (invalidUser) return res.sendStatus(401);

    const user = result.rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);
    const wrongPassword = !checkPassword;

    if (wrongPassword) return res.sendStatus(401);

    res.locals.session = {
      userId: user.id,
      token: uuidV4(),
    };

    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getMeMid(req, res, next) {
  const id = res.locals.session.userId;

  console.log(id);

  try {
    const result = await db.query(
      `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
            json_agg(
              json_build_object(
                'id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount"
                )
              ) AS "shortenedUrls"
            FROM users
            JOIN urls ON users.id = urls."userId"
            WHERE users.id = $1
            GROUP BY users.id;`,
      [id]
    );
    const absentUrls = result.rowCount === 0;
    if (absentUrls) return res.status(404).send("No urls");

    const user = result.rows[0];

    res.locals.userData = user;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getRankingMid(req, res, next) {
  try {
    const result = await db.query(
      `SELECT users.id, users.name,
         COALESCE(links_count, 0) AS "linksCount",
          COALESCE(visit_count, 0) AS "visitCount"
          FROM users
              LEFT JOIN (
                SELECT "userId", COUNT(*) AS links_count,
                SUM("visitCount") AS visit_count
                FROM urls
                  GROUP BY "userId"
              )
              AS url_counts ON users.id = url_counts."userId"
    ORDER BY visit_count DESC NULLS LAST, links_count DESC NULLS LAST, users.id ASC
    LIMIT 10;`
    );

    res.locals.rankingList = result.rows;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
