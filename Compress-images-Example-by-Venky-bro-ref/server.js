var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var compress_images = require("compress-images");
const fs = require("fs");
var FileReader = require("filereader");
var Jimp = require("jimp");
var app = express();
var outputPath = "bulk-output/";

app.use(express.static("public"));

// const toBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Connection success" });
// });

app.post("/profile", upload.single("avatar"), async function (req, res, next) {
  let date = new Date();
  let timestamp = date.getTime();

  try {
    const { file, body } = req;
    // console.log({ file, body });

    console.log(file);

    let pathh = file.path.replace(/\\/g, "/");

    // let buff = await fs.readFileSync(file.path);

    // let base64data = await buff.toString("base64");

    console.log(pathh);

    const readImg = await Jimp.read(pathh);
    // console.log("Current image name -->");
    // console.log(readImg);
    // console.log("readImg is -> " + readImg);
    // console.log(JSON.stringify(readImg));

    compress_images(
      file.originalname,
      outputPath,
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
      { png: { engine: "pngquant", command: ["--quality=20-40"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      {
        gif: {
          engine: "gifsicle",
          command: ["--colors", "64", "--use-col=web"],
        },
      },
      function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");
      }
    );

    res.json({ status: 200 });
  } catch (e) {
    next(e);
  }
});

app.listen(3000, () => {
  console.log(`Server listening!`);
});
