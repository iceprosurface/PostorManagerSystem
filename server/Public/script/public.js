/**----------------------------------
*获取地址栏参数
*函数名:getUrlParam
*参数：param
*说明：需要的地址栏参数
*返回值：if exit return 参数 else null
-----------------------------------*/
//获取地址栏参数
function getUrlParam(Param){
    var reg = new RegExp("(^|&)"+ Param +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); 
	return null; //返回参数值
}  
/**----------------------------------
*cookie的操作js                          
*函数名:setcookie（设置cookie）

*参数：cname，cvalue，exdays
*说明：cookie的名字，值，存在期限（日）
*                         
*函数名:getCookie（获取cookie）
*参数：cname
*说明：cookie的名字
*返回值：if exit return value else ""
*
*函数名:clearCookie(清除cookie)
*说明：清除cookie
*                                                          
-----------------------------------*/
//设置cookie 
function setCookie(cname, cvalue, exdays) { 
	var d = new Date(); 
	d.setTime(d.getTime() + (exdays*24*60*60*1000)); 
	var expires = "expires="+d.toUTCString(); 
	document.cookie = cname + "="+ cvalue + "; "+expires; 
	} 

//获取cookie 
function getCookie(cname) { 
	var name = cname + "="; 
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) { 
		var c =ca[i];
		while(c.charAt(0)==' ') c = c.substring(1);
		if(c.indexOf(name) != -1) return c.substring(name.length, c.length); 
	} 
	return ""; 
} 
//清除cookie 
function clearCookie(name) { 
	setCookie(name, "", -1); 
} 
	
	
/**----------------------------------
* json对象转字符串形式
*函数名:json2str（json转化为str）
*参数：o
*说明：待转化json
*
*字符串转json形式
*函数名:stringToJson（json转化为str）
*参数：stringValue
*说明：需要转化的string
----------------------------------*/
function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
} 

function stringToJson(stringValue){
	eval("var theJsonValue = "+stringValue);
	return theJsonValue;
} 