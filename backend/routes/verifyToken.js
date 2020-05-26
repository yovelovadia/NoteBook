const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearer = req.headers["authorization"];
  console.log(bearer);

  if (bearer !== undefined) {
    const token = bearer.split(" ")[1];
    req.token = token;
    console.log("pass");
    next();
  } else {
    console.log("nigger no");
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
