// gulp/task/watch.js
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function(){
    watch(config.sass.all, function(){  //监听所有less
        gulp.start('sass');             //出现修改、立马执行less任务
    })
    watch(config.html.all,function(){
    	gulp.start('html');
    })
    watch(config.css.all,function(){
    	gulp.start('css');
    })
})