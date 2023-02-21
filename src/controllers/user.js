import dayjs from "dayjs";
import db from "../config/database.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

    await db.query(
      `
        INSERT INTO users
            (name, email, password,"createdAt")
            VALUES
            ($1, $2, $3, '${now}')
        `,
      [name, email, password]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send("Sever error: " + error);
  }
}
