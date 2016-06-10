// gulp/task/css.js
var gulp = require('gulp');
//文件合并
var concat = require('gulp-concat');
//文件更名
var rename = require('gulp-rename');
//css压缩
var minifycss = require('gulp-minify-css');
var config = require('../config').css;

// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src(config.src)
    .pipe(concat('all.css'))
    .pipe(gulp.dest(config.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dest))
    //.pipe(notify({ message: 'css task ok' }));
});