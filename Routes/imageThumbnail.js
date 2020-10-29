var express = require("express");
var router = express.Router({ mergeParams: true });
const sharp = require("sharp");
var fs = require("fs");
request = require("request");
const jwt = require("jsonwebtoken");
const jwtKey = "harsh_private_key";

router.post("/", (req, res) => {
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

  //   WORKING WITH IMAGE IF TOKEN IS SIGNED
  //   ===========================================================================
  var imgUrl = req.body.imgUrl;
  var fileName = `${Date.now()}`;
  //   DOWNLOADING THE ORIGINAL IMAGE
  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
  };
  download(imgUrl, `Images/original/${fileName}.png`, function () {
    console.log("Image Downloaded");
    //   RESIZING AND DOWNLOADING THE RESIZED IMAGE
    sharp(`./Images/original/${fileName}.png`)
      .resize({
        height: 50,
        width: 50,
        fit: sharp.fit.inside,
        withoutEnlargement: false,
      })
      .toFormat("png")
      .toFile(`./Images/ResizedImages/${fileName}.png`)
      .then(function (newFileInfo) {
        console.log("Image Resized");
        // SEND FILE IN RESPONSE
        // res.sendFile("global");
      })
      .catch(function (err) {
        console.log(err.message);
      });
  });
});

module.exports = router;
