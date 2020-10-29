var express = require("express");
var router = express.Router({ mergeParams: true });
var jsonpatch = require("fast-json-patch");

const jwt = require("jsonwebtoken");
const jwtKey = "harsh_private_key";

router.patch("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  //   res.send(`Welcome ${payload.email}!`);
  const { object, patch } = req.body;
  var document = jsonpatch.applyPatch(object, patch).newDocument;
  res.status(200).json(document);
});

module.exports = router;
