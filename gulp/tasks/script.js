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
// 输出错误
var gutil = require('gulp-util');
// es6->es5
var babel = require("gulp-babel");

var config = require('../config').js;

gulp.task('script', function() {
	return gulp.src(config.src)
		//.pipe(concat('all.js'))
		.pipe(gulp.dest(config.dest))
		.pipe(rename({ suffix: 'es5' }))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(jshint())//{"esnext" : true}))
		.pipe(jshint.reporter('default'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.dest));
});
