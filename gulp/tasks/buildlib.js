// gulp/task/buildlib.js
var gulp = require('gulp');
//文件更名
var rename = require('gulp-rename');
//css压缩
var minifycss = require('gulp-minify-css');
//js检测
var jshint = require('gulp-jshint'); 
//js压缩
var uglify = require('gulp-uglify'); 

var librarys = require('../config').librarys;

var lib = require('../lib');

// 将bower的库文件对应到指定位置
gulp.task('buildlib',['cleanlib'],function(){
  
  var dep = [];
  if(librarys != []){
    dep.push(...librarys);
    for(var i in librarys){
      dep.push(...iteraterDepent(lib[librarys[i]]));
    }
  }
  dep = delrep.apply(dep);
  for(let j in dep){
    for(let k in lib[dep[j]].patten){
      gulp.src(lib[dep[j]].patten[k].path)
        .pipe(gulp.dest(lib[dep[j]].patten[k].dest))
      
    }
    
  }

});
function iteraterDepent(array){
  var dependent = new Array();
  if(array.dependences != []){
    dependent.push(...array.dependences);
    for(i in array.dependences){
      dependent.push(...iteraterDepent(lib[array.dependences[i]]));
    }
  }
  return dependent;
}
//基于基数的去重
function delrep() {
    var n = {},
    r = []

    this.forEach(function(v){
        if (!n[typeof(v) + v]) {
            n[typeof(v) + v] = true
            r.push(v)
        }
    })
    return r
}

