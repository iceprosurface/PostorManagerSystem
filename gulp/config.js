// gulp/config.js
var src = './src';
var dest = './dest';
var lib = './dest/lib';

module.exports = {
	output: dest,
	//sass的设置
	sass: {
		all: src + "/sass/**/*.scss",  //所有sass
		src: src + "/sass/*.scss",	 //需要编译的sass
		dest: dest + "/css",	   //输出目录
		settings: { style: 'expanded'},		//编译sass过程需要的配置，可以为空
		map: dest + "/map" //map
	},

	//html的设置
	html: {
		all: src + "/html/**/*.html", //所有的html文件
		dest: dest + "/"
	},

	//css
	css: {
		all: src + '/css/*.css',
		src: src + '/css/*.css',
		dest: dest + '/css'
	},

	js: {
		all: src + '/js/*.js',
		src: src + '/js/*.js',
		dest: dest + '/js'
	},


	font: lib + '/fonts',

	librarys: ['angularRoute','jquery','flatui'],

}