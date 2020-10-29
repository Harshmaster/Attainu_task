var express = require("express");
var router = express.Router({ mergeParams: true });
const jwt = require("jsonwebtoken");
const jwtKey = "harsh_private_key";
const jwtExpirySeconds = 600;

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);
  res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
});

module.exports = router;
