// gulp/task/watch.js
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
//util
var gutil = require('gulp-util');
//浏览器同步
var browserSync = require('browser-sync').create();
//简化reload
var reload = browserSync.reload;

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
    watch(config.js.all,function(){
    	gulp.start('script-watch'); //出现修改、立马执行js任务
    })
});
// 浏览器重载
gulp.task('script-watch', ['script'], reload);
// 静态服务器
gulp.task('server', ['html', 'sass', 'script'], function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: ["./dest"],
            index: "./index.html"
        },
        //禁止网络模式
        online: false,
        //静止ui模式
        ui: false

    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.start('watch-br');
});