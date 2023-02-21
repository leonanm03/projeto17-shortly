// Controllers

import db from "../config/database.js";

export async function getTeste(req, res) {
    console.log("entrei no get")
  try {
    const teste = await db.query('SELECT * FROM teste;');
    return res.status(200).send(teste.rows);
  } catch (error) {
    return res.status(500).send(error);
  }
}
