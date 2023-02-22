export async function postUrl(req, res) {
  const { session } = res.locals;
  try {
    return res.status(201).send(session);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
