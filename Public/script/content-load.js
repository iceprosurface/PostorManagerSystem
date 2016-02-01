
function sidebarRefresh(tlogin){
	//检测邮件数目使用
	if(tlogin!=""){
		$.post(
		"/index.php/home/get/getOrderNumber", 
		tlogin,
		function(data){
			json = eval('('+data+')');
			$("#checkedCount").text(json.checkedCount);
			$("#uncheckCount").text(json.uncheckedCount);
			var allCount=json.checkedCount+json.uncheckedCount;
			$("#allCount").text(allCount);
		});
	}
}
//切换到尚未收件列表
function turnUnreceived(){
	$("#main").load("/index.php/home/get/load?page=TurnUnchecked",function(){loadUnchecked(1);});
}
//切换到设置页面
function changeToConfig(){
	$("#main").load("/index.php/home/get/load?page=ChangeToConfig");
}
//切换到已经收件列表
function turnReceived(){
	$("#main").load("/index.php/home/get/load?page=TurnChecked",function(){loadChecked();});
}
//切换到垃圾箱
function turnBin(){
	$("#main").load("/index.php/home/get/load?page=TurnBin");
}
//切换到全部收件列表
function turnAll(){
	$("#main").load("/index.php/home/get/load?page=TurnAll");
}
//登出
function loginOut(){
	var tlogin;
	if(tlogin!=""){
		$.post(
			"/index.php/home/login/loginOut", 
			tlogin,
			function(data){
				json = eval('('+data+')');
				if(json.status==1){
					window.location="/index.php/home/login/login?respond=1";
				}else{
					alert('没有成功登出');
				}
			});
	}else{
		window.location="/index.php/home/login/login?respond=1";
	}
	
}
function loadChecked(){
	var tlogin;
	$.post(
		"/index.php/home/get/getChecked",
		{'page':'1'},
		function(data){
			data = eval('('+data+')');
			$("#OrderTable").html("");//清空info内容
			$.each(data.orders, function(i, item){
				$("#OrderTable").append(
						"<tr>"+
						"<td>"+
						"<label class='input-control checkbox small-check no-margin'>"+
							"<input type='checkbox' id='checkBox_"+i+"''>"+
							"<span class='check'></span>"+
						"</label>"+
						"</td>"+
							"<td>" + item.orderid + "</td>"+
							"<td>" + item.exporttime + "</td>"+
							"<td>" + item.orderinfo + "</td>"+
							"<td>" + item.postorid + "</td>"+
						"</tr>");
			});
			loadConvertButton(data);
		}
	);
}
function loadUnchecked(page){
	var tlogin;
	$.post(
		"/index.php/home/get/getUnchecked",
		{'page':page},
		function(data){
			data = eval('('+data+')');
			$("#OrderTable").html("");//清空info内容
			$.each(data.orders, function(i, item) {
				$("#OrderTable").append(
						"<tr>"+
						"<td>"+
						"<label class='input-control checkbox small-check no-margin'>"+
							"<input type='checkbox' class='uncheck' id='checkBox_"+i+"''>"+
							"<span class='check'></span>"+
						"</label>"+
						"</td>"+
							"<td>" + item.orderid + "</td>"+
							"<td>" + item.importtime + "</td>"+
							"<td>" + item.positionid    +"</td>"+	
							"<td>" + item.orderinfo + "</td>"+
							"<td>" + item.postorid + "</td>"+
						"</tr>");
			});
			loadConvertButton(data);
		}
	);
}
function loadConvertButton(x){
	var page=x.page-0;
	var maxPage=x.maxPage-0;
	$("#page").html("");
	$("#page").append(page+"/"+maxPage);
	
	if(page>=2){
		$("#previousPage").attr('onclick','');
		$("#previousPage").attr('onclick','loadUnchecked('+(page-1)+')');
		
	}
	if(maxPage>1){
		$("#nextPage").attr('onclick','');
		$("#nextPage").attr('onclick','loadUnchecked('+(page+1)+')');
	}
}