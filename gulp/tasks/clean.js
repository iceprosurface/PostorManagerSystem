// gulp/task/clean.js
var gulp = require('gulp');
var clean = require("gulp-clean");

var lib = require('../lib');
var config = require('../config');

gulp.task('cleanlib',function(){
  return gulp.src(lib.path, {
        read: false
    })
    .pipe(clean({force: true}));
});

gulp.task('clean',function(){
  gulp.src(config.output, {
        read: false
    })
    .pipe(clean({force: true}));
});