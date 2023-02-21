import dayjs from "dayjs";
import db from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const now = dayjs().format("YYYY-MM-DD");

    // password crypt
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    await db.query(
      `
        INSERT INTO users
            (name, email, password,"createdAt")
            VALUES
            ($1, $2, $3, '${now}')
        `,
      [name, email, passHash]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Sever error: " + error);
  }
}
