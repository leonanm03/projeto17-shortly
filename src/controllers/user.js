import db from "../config/database.js";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.signUp;

  try {
    await db.query(
      `
        INSERT INTO users
            (name, email, password)
            VALUES
            ($1, $2, '${password}')
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
