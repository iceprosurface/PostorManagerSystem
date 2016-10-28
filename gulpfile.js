// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass');
//如果需要可以生成sourcemap
var sourcemaps = require('gulp-sourcemaps');
//css压缩
var minifycss = require('gulp-clean-css');
//重命名
var rename = require('gulp-rename');
//gulp监视器
var watch = require('gulp-watch');
//js检测
var jshint = require('gulp-jshint');
//util
var gutil = require('gulp-util');
//浏览器同步
var browserSync = require('browser-sync').create();
//简化reload
var reload = browserSync.reload;
// es6->es5
var babel = require("gulp-babel");
//html引入
var fileinclude = require('gulp-file-include');
//hash
var rev = require('gulp-rev-append');
//js压缩
var uglify = require('gulp-uglify');
//增量更新
var changed = require('gulp-changed');
var jshintConfig = { "undef": false, "esnext": true, "predef": ["$", "window", "jQuery"] };
gulp.task('default', ['server']);

gulp.task('sass', function() {
    return gulp.src("src/sass/main.scss")
        .pipe(sass({ style: 'expanded' }))
        .on('error', function(err) {
            gutil.log('sass Error!', err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dest/css"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss({ keepSpecialComments: "*", processImportFrom: ['!fonts.googleapis.com'] }))
        .pipe(gulp.dest("dest/css"))
        .pipe(reload({ stream: true }));
});
gulp.task('css', function() {
    return gulp.src("src/css/**/*.css")
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest("dest/css"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss({ keepSpecialComments: "*", processImportFrom: ['!fonts.googleapis.com'] }))
        .pipe(gulp.dest("dest/css"))
        .pipe(reload({ stream: true }));
});
gulp.task('html', function() {
    gulp.src(["src/html/**/*.html", "!src/html/public"])
        .pipe(fileinclude())
        .on('error', function(err) {
            gutil.log('html Error!', err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dest"))
        .pipe(rev())
        .on('error', function(err) {
            gutil.log('html Error!', err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dest"))
        .pipe(reload({ stream: true }));
});
gulp.task('script', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(changed("dest/js"))
        .pipe(gulp.dest("dest/js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            gutil.log('js Error!', err.message);
            this.emit('end');
        })
        // .pipe(jshint(jshintConfig)) //{"esnext" : true}))
        // .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .on('error', function(err) {
            gutil.log('js Error!', err.message);
            this.emit('end');
        })
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dest/js"))
        .pipe(reload({ stream: true }));
});
// 浏览器重载
gulp.task('script-watch', ['script'], reload);
// gulp.task('html-watch', ['html'], reload);

// 静态服务器
gulp.task('server', ['html', 'sass', 'script', 'css'], function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
		proxy:"localhost:4000",
        //禁止网络模式
        online: false
            //静止ui模式
            // ui: false

    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    watch("src/sass/**/*.scss", function() { //监听所有sass
        gulp.start('sass'); //出现修改、立马执行sass任务
    });
    watch("src/js/**/*.js", function() { //监听所有js
        gulp.start('script-watch'); //出现修改、立马执行js任务
    });
    watch("src/html/**/*.html", function() { //监听所有html
        gulp.start('html').on('change', reload); //出现修改、立马执行html任务
    });
    watch("src/css/**/*.css", function() { //监听所有css
        gulp.start('css'); //出现修改、立马执行css任务
    });
});

gulp.task('watch', function() {
    watch("src/sass/**/*.scss", function() { //监听所有sass
        gulp.start('sass'); //出现修改、立马执行sass任务
    });
    watch("src/js/**/*.js", function() { //监听所有js
        gulp.start('script-watch'); //出现修改、立马执行js任务
    });
    watch("src/html/**/*.html", function() { //监听所有html
        gulp.start('html').on('change', reload); //出现修改、立马执行html任务
    });
    watch("src/css/**/*.css", function() { //监听所有css
        gulp.start('css'); //出现修改、立马执行css任务
    });
});
