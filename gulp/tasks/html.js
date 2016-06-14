var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var rev = require('gulp-rev-append');
var config = require('../config').html;

gulp.task('html', function(){
	gulp.src(config.src)
		.pipe(fileinclude())
		.pipe(gulp.dest(config.dest))
		.pipe(rev())
		.pipe(gulp.dest(config.dest));
});