// gulp/task/javascript.js
var gulp = require('gulp');
//js检测
var jshint = require('gulp-jshint'); 
//js压缩
var uglify = require('gulp-uglify'); 
//文件合并
var concat = require('gulp-concat');
//文件更名
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var config = require('../config').js;

gulp.task('script', function() {
	return gulp.src(config.src)
		//.pipe(concat('all.js'))
		.pipe(gulp.dest(config.dest))
		.pipe(jshint())//{"esnext" : true}))
		.pipe(jshint.reporter('default'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.dest));
});
