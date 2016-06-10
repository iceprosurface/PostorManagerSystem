// gulp/task/default.js
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence'); 
gulp.task('work',function(cb){
	gulpSequence(['sass','css','script'],'html')(cb);

});//,'watch']);
