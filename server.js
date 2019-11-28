var port = process.env.PORT || 6969;
var http = require("http");
var app = require("./app");

var server = http.createServer(app);

server.listen(port);
console.log("Listening at " + port);
