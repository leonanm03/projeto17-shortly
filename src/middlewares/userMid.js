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
