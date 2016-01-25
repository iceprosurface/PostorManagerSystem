## View层调用结构说明
### 步骤 1 
http请求发出，向index.php请求对应controller内容。
通解结构为
/index.php/模块名称/控制器名称/方法名称？Get参数
结构如下
/index.php/home/login/login
1.由于url重写，符合^(.*)$结构的将会被解析为/index.php/$1所以以下结构也会生效
/home/login/login
2.同时由于默认模块为home，如果没有指定模块名称将会自动补全模块名称所以以下结构同样有效
/login/login
上述1,2将会两项最后将会被thinkphp.php文件识别为/index.php/home/login/login

### 步骤 2
Index.php调用thinkphp.php文件向LoginController.class.php中调用Login()方法
此时login方法将会处理逻辑功能然后输出给view页面，此例并没有像view页面输出内容

### 步骤 3 
输出view页面，在controller中输出的是login.html,所以这里，index.php想/application/home/view/login/login.html请求并解析。

### 步骤 4
Index.php对形如<include />标签的文件进行处理，
<include file="Public:header" title="登陆"/>
例如此例，这里没有指定模块名称故是向home模块下public控制下的header方法发出请求，要求补全这里的内容，此处将不会执行控制器中的方法，而是直接向/application/home/view/public/header.html进行读取
并将<include file="Public:header" title="登陆"/>全部替换为/application/home/view/public/header.html这个文件，同时将该文件中的”[title]”替换为标签属性 title="登陆"即替换为”登陆”两个字
例
原文件：
![image](https://github.com/iceprosurface/PostorManagerSystem/tree/v0.4.0/Doc/viewmd/pic1.png)

Header.html
![image](https://github.com/iceprosurface/PostorManagerSystem/tree/v0.4.0/Doc/viewmd/pic2.png)

处理后：
1.替换<include file="Public:header" title="登陆"/>
![image](https://github.com/iceprosurface/PostorManagerSystem/tree/v0.4.0/Doc/viewmd/pic3.png)
2.替换 [title]
![image](https://github.com/iceprosurface/PostorManagerSystem/tree/v0.4.0/Doc/viewmd/pic3.png)
