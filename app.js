var express = require("express");
var app = express();

var route = require("./api/route/route");

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,UPDATE,DELETE,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-with-content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(express.json());
app.use("/api/", route);

module.exports = app;
