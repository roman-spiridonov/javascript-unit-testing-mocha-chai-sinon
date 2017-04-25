let gulp = require("gulp");
let mocha = require("gulp-mocha");

gulp.task("default", function () {
  gulp.watch("./*.js", ["test"]);
});

gulp.task("test", function () {
  gulp.src("./test/**/*.js")
    .pipe(mocha({ reporter: "spec" }));
});