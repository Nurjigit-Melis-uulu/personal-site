const { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileInclude = require("gulp-file-include"),
  autoprefixer = require("gulp-autoprefixer"),
  del = require("del"),
  groupMedia = require("gulp-group-css-media-queries"),
  scss = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  webpCSS = require("gulp-webpcss"),
  rename = require("gulp-rename");

let projectFolder = "dist";
let sourceFolder = "src";
let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/images/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/scss/main.scss",
    js: sourceFolder + "/js/main.js",
    img: sourceFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + projectFolder + "/",
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserlist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(webpCSS())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        iterlaced: true,
        optimizationLevel: 7,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.images = images;
exports.default = watch;
