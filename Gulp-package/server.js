const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const gulp = require('gulp');

// gulp.task('default', () => {
  gulp.src('images/*')
    .pipe(imagemin([
      pngquant({quality: [0.2, 0.2]}),
      mozjpeg({quality: 20}),
      imageminGifsicle({interlaced: true, optimizationLevel: 3}),
      imageminSvgo({removeViewBox: false}),
    ]))
    .pipe(gulp.dest('output/'))
// });