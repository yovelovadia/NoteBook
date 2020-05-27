const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearer = req.body.params.token;

  if (bearer !== undefined) {
    const token = bearer.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
