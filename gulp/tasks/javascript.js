// gulp/task/javascript.js
var gulp = require('gulp');
var jshint = require('gulp-jshint'); //js检测
var uglify = require('gulp-uglify'); //js压缩

gulp.task('javascripts', function() {
	return gulp.src(config.src)
		.pipe(concat('all.js'))
		.pipe(gulp.dest(config.dest))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest));
});
