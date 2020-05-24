const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearer = req.headers["Authorization"];
  //   const bearerSplit = bearer.split(" ");
  //   const token = bearerSplit[1];
  //   if (token) {
  //     res.json(token);
  //   } else {
  //     res.status(403).json("Must log in");
  //   }
}

module.exports = verifyToken;
