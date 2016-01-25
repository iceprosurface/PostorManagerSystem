## 这是一个新制作的项目 ##
* 使用thinkphp
* 应用式的界面
* 使用了boostrap框架下属的metro UI CSS

## 新的分支 v0.4.0 ##
* 本次预计增加后台cms系统
* 修正记住登陆时间小于预计时间的问题
* 修正登陆bug
* 修正存在通过获取cookie来仿冒用户的bug
* 增加了后台cms的model（即admin）

## 最新版本使用指南 ##
* 首先你需要打开github下载文件至www目录下，一般默认为www/PostManagerSystem/…
* 下一步你需要设置apache，打开wmap目录（如果是非继承环境请找到apache目录，通常这个文件将会安装到prommme目录下）
* 如果你是wmap，寻找bin/apache/apache2.244(对应版本号)/conf/httpd.conf,打开并查找www,你可能会找到如下所示的内容
	DocumentRoot "D:/wamp/www"
	<Directory "D:/wamp/www">
	将这两个修改为你对应的下载好的github项目文件地址,例如我的地址是这样的
	DocumentRoot "D:/wamp/www/PostManagerSystem"
	<Directory "D:/wamp/www/PostManagerSystem">
	如果你是非继承环境下的，寻找对应apache目录，并对其更目录下的conf/httpd.conf文件执行相同操作
* 下一步开启url重写功能 ，在同样的httpd.conf文件中搜索AllowOverride，通常该项在上一步所在行的上面
	将其修改为
	<Directory />
		AllowOverride all
		Require all granted
	</Directory>
* 如果实在不会修改可以尝试在doc目录下copy httpd.conf 文件至指定位置
* 注意检查项目中的.htaccess文件，这个文件可能没有正常上传，如果没有改文件请在如下目录创建
	/PostManagerSystem
		/application
		/public
		/doc
		/thinkphp
		.gitignore
		.htaccess
		index.php
	