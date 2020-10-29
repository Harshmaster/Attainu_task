// REQUIRE MODULES
// ===============
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


// BASIC SETTINGS
// ==============
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// IMPORTING AND USING API ROUTES
//============================

var loginRoute = require("./Routes/login");
app.use("/login", loginRoute);

var imageResizeRoute = require("./Routes/imageThumbnail.js");
app.use("/resizeImage", imageResizeRoute);

var patchObject = require("./Routes/jsonPatch");
app.use("/applyPatch", patchObject);

// LISTENING TO SERVER
// ===================
port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("SERVER RUNNING ON PORT " + port);
});
