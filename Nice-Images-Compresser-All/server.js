// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
var compress_images = require("compress-images");

// const OUTPUT_path = "built/";

// const app = express();
// const port = 8088;

// // parsing the data
// app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
// app.use(bodyParser.json({ limit: "100mb" }));

// app.use(cors());
// app.options("*", cors());

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Connection success" });
// });

// app.post("/", (req, res) => {

// let inputImages = req.files;
// let bodyy = req.body;

// console.log(inputImages);
// console.log(bodyy);

//   compress_images(
//     inputImages,
//     OUTPUT_path,
//     { compress_force: false, statistic: true, autoupdate: true },
//     false,
//     { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
//     { png: { engine: "pngquant", command: ["--quality=20-40"] } },
//     { svg: { engine: "svgo", command: "--multipass" } },
//     {
//       gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
//     },
//     function (error, completed, statistic) {
//       console.log("-------------");
//       console.log(error);
//       console.log(completed);
//       console.log(statistic);
//       console.log("-------------");
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port -> ${port}`);
// });

// var compress_images = require("compress-images"),
//   INPUT_path_to_your_images,
//   OUTPUT_path;

// INPUT_path_to_your_images = "images/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
// let inputImages = [
//   {
//     id: 1,
//     src: "images/194027.jpg",
//   },
//   {
//     id: 2,
//     src: "images/251645.jpg",
//   },
//   {
//     id: 3,
//     src: "images/Rotating_earth.gif",
//   },
//   {
//     id: 4,
//     src: "images/icon.PNG",
//   },
// ];

// OUTPUT_path = "built/";

// inputImages.forEach((img) => {
//   let splitImg = img.src.split(".");
//   let ext = splitImg[splitImg.length - 1];
//   let d = new Date();
//   let millisecondsSince1970 = d.getTime().toString();
//   const newFilename = millisecondsSince1970 + "." + ext;

//   compress_images(
//     img.src,
//     OUTPUT_path,
//     { compress_force: false, statistic: true, autoupdate: true },
//     false,
//     { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
//     { png: { engine: "pngquant", command: ["--quality=20-40"] } },
//     { svg: { engine: "svgo", command: "--multipass" } },
//     {
//       gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
//     },
//     function (error, completed, statistic) {
//       console.log("-------------");
//       console.log(error);
//       console.log(completed);
//       console.log(statistic);
//       console.log("-------------");
//     }
//   );
// });

// Bulk upload

INPUT_path_to_your_images = "bulk/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
OUTPUT_path = "bulk-output/";

compress_images(
  INPUT_path_to_your_images,
  OUTPUT_path,
  { compress_force: false, statistic: true, autoupdate: true },
  false,
  { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
  { png: { engine: "pngquant", command: ["--quality=20-40"] } },
  { svg: { engine: "svgo", command: "--multipass" } },
  {
    gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
  },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
  }
);
