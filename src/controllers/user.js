import db from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // password crypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    await db.query(
      `
        INSERT INTO users
            (name, email, password)
            VALUES
            ($1, $2, '${passHash}')
        `,
      [name, email]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Sever error: " + error);
  }
}

export async function signIn(req, res) {
  const { userId, token } = res.locals.session;

  try {
    await db.query(
      `
        INSERT INTO sessions
        ("userId", token)
        VALUES
        ('${userId}', '${token}');
        `
    );

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
