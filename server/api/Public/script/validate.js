function validate_email(field){
	var text=document.getElementById("email_v");
	if(isnull(field)){
		text.innerHTML="*邮箱不能为空";
		return false;
	}
	apos=field.value.indexOf("@")
	dotpos=field.value.lastIndexOf(".")
	if (apos<1||dotpos-apos<2){
		text.innerHTML="*你输入的邮箱地址有误";
		return false;
	}else{
		text.innerHTML="";
		return true;
	}
}
function validate_usr(field){
	var text=document.getElementById("usr_v");
	if (isnull(field)){
		text.innerHTML="*用户名不能为空";
		return false;
	}
	else{
		text.innerHTML="";
		return true;
	}
}
function validate_psw(field){
	var text=document.getElementById("psw_v");
	var nl=field.value.length;
	if (isnull(field)){
		text.innerHTML="*密码不能为空";
		return false;
	}
	else if(nl<6||nl>16){
		text.innerHTML="*密码长度必须为6-16";
		return false;
	}else{
		text.innerHTML="";
		return true;
	}
}
function isnull(field){
	var nl=field.value.length;
	if (nl==0){
		return true;
	}
	else{
		return false;
	}
}
function SUBMIT(url){
	var usr = document.register.usr;
	var psw = document.register.psw;
	var email = document.register.email;
	if(!validate_usr(usr)){
		usr.focus();
		return;
	}
	if(!validate_psw(psw)){
		psw.focus();
		return;
	}
	if(!validate_email(email)){
		email.focus();
		return;
	}
	register.submit();
}