var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var Jimp = require("jimp");
var app = express();

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Connection success" });
// });

app.post("/profile", upload.single("avatar"), async function (req, res, next) {
  let date = new Date();
  let timestamp = date.getTime();

  try {
    const { file, body } = req;
    // console.log({ file, body });

    const readImg = await Jimp.read(file.path);
    // console.log("Current image name -->");
    // console.log(readImg);
    console.log("mimeType is -> " + readImg._originalMime);
    let mimeType = readImg._originalMime;
    let splitMimeType = mimeType.split("/");
    let ext = splitMimeType[1];
    console.log("Current image extension is -->" + ext);
    readImg
      // .quality(80) // set JPEG quality
      .write(`output/${timestamp}.${ext}`); // save

    res.json({ status: 200 });
  } catch (e) {
    next(e);
  }
});

app.listen(3000, () => {
  console.log(`Server listening!`);
});
