// gulp/task/sass.js
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//css压缩
var minifycss = require('gulp-minify-css');    
//重命名
var rename = require('gulp-rename');

var config = require('../config').sass;

gulp.task('sass', function(){
    return gulp.src(config.src)
    	//.pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.dest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.dest))
});