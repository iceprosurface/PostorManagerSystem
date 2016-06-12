// gulp/config.js
var src = './src';
var dest = './dest';
var lib = './dest/lib';

module.exports = {
	output: dest + "/",
	//sass的设置
	//对于less，按照对应根目录scss文件编译，由于有@import无需考虑其他
	sass: {
		all: src + "/sass/**/*.scss",  //所有sass
		src: src + "/sass/*.scss",	 //需要编译的sass
		dest: dest + "/css",	   //输出目录
		settings: { style: 'expanded'},		//编译sass过程需要的配置，可以为空
		map: dest + "/map" //map
	},

	//html的设置
	html: {
		all: [src + "/html/**/*.html","!" + src + "/html/public/"], //所有的html文件
		dest: dest + "/"
	},

	//css
	//对于css不分先后全部合并，确保css内容相互无冲突
	//在html中css优先级高于sass编译完成文件
	css: {
		src: src + '/css/*.css',
		all: src + '/css/*.css',
		dest: dest + '/css'
	},
	//js文件仅对module进行合并所以需要确保所有添加的js为独立模块
	js: {
		src: src + '/js/*.js',
		all: src + '/js/*.js',
		dest: dest + '/js'
	},


	font: lib + '/fonts',

	librarys: ['angularRoute','metro'],

}