import gulp from "gulp";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

import autoprefixer from "autoprefixer";
import plumber from "gulp-plumber";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

function swallow(err) {
  console.error(err.message);
  this.emit("end");
}

function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'collapseGroups',
              active: true
            }
          ],
        }),
      ])
    )
    .pipe(gulp.dest("www/assets/images"));
}

function css() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError, swallow))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write(".", { sourceRoot: "css-source" }))
    .pipe(gulp.dest("www/assets/css/"));
}

function js() {
  return gulp
    .src(["./src/js/**/*"])
    .pipe(plumber())
    .pipe(gulp.dest("./www/assets/js/"))
}

function fonts() {
  return gulp.src(["src/fonts/**/*"]).pipe(gulp.dest("www/assets/fonts/"));
}

const build = gulp.series(js, css, fonts, images);

export default build;
