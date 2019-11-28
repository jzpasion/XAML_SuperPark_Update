var express = require("express");
var router = express.Router();
var bodyparser = require("body-parser");
var fs = require("fs");
var xml;
var parseString = require("xml2js").parseString;
var multer = require("multer");
var path = require("path");
router.use(bodyparser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "xml");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname);
  }
});

var upload = multer({ storage: storage });

router.get("/", function(req, res) {
  res.sendFile(path.resolve("./html/index.html"));
});

router.get("/GetXAML", (req, res) => {
  fs.readFile("./xml/update.xml", "utf-8", function(err, data) {
    if (err) console.log(err);
    // we log out the readFile results

    xml = data;
    console.log(xml);
    // we then pass the data to our method here
    parseString(xml, function(err, result) {
      if (err) console.log(err);
      // here we log the results of our xml string conversion
      console.log(result);
      res.send(result);
    });
  });
});

router.post("/uploadfile", upload.single("update.xml"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    res.send("Please Upload a File!");
  }
  res.send("File Uploaded");
});

module.exports = router;
