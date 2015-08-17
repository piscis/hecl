var gulp = require("gulp");
var tsc = require("gulp-typescript");
var plugins = require("gulp-load-plugins")();
var tsProject =  tsc.createProject('./tsconfig.json');
var del = require('del');


gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
    'build/**/*.js',    // path to all JS files auto gen'd by editor
    'build/**/*.js.map' // path to all sourcemap files auto gen'd by editor
  ];

  // delete the files
  del(typeScriptGenFiles, cb);
});


gulp.task("compile-ts", ['clean-ts'], function () {
  var files = [
    'typings/tsd.d.ts',
    'src/**/*.ts'
  ];

  var tsResult = gulp.src(files)
    .pipe(tsc(tsProject));

  return tsResult.js
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build'));
});


gulp.task("default", ['compile-ts'], function (cb) {
  cb()
});

gulp.task("dist", ['compile-ts'],function(){

  var files = [
    'build/*.js',
    'build/**/*.js'
  ];

  gulp.src(files)
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'));
});