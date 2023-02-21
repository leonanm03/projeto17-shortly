import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

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
    if (invalidUser) {
      return res.sendStatus(401);
    }

    const user = result.rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);
    const wrongPassword = !checkPassword;

    if (wrongPassword) {
      return res.status(401).send("wrong password");
    }

    res.locals.session = {
      userId: user.id,
      token: uuidV4(),
    };

    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
