<?php
namespace Home\Controller;
use Think\Controller;
class MailController extends Controller {
	public function demo(){
		// $map['id']=1325115;
		// $token = 6666;
		// $usrs = M('usr');
		// $usrs->create($usr_info);
		// $usr=$usrs->where($map)->find();
		// $url="http://localhost/index.php/email/va?id=".$usr['id']."&token=".$token;
		// $url="www.baidu.com";
		// $Body = "亲爱的".$usr['name']."：<br/>  你注册的 <strong>".$usr['id']."</strong>尚未被激活，请点击下列链接以验证邮箱激活：<br/>  <a href=".$url.">点击此处</a><br/>请不要将该邮件转发或复制给任何其他用户，该链接在30min内验证有效，若该用户与你无关请不要点击该邮件内的任何链接谢谢配合。";
		// $result = sendMail($usr['email'],'快件管理中心的激活邮件',$Body);
		echo C("DB_HOST");
	}
	//邮件验证平台
	public function mailcheck(){
		$token=getClientLToken();
		if(isThisTokenL($token)){
			$map['Id'] = getTokenKey($token);
			$usrs = M('usr');
			$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
			if($usrs->create($usr_info)){
				$usr=$usrs->where($map)->find();
				$url="http://".C("DB_HOST")."/index.php/email/va?id=".$usr['id']."&token=".$token;
				$Body = "亲爱的".$usr['name']."：<br/>  你注册的 <strong>".$usr['id']."</strong>尚未被激活，请点击下列链接以验证邮箱激活：<br/>  <a href='".$url."'>点击此处</a><br/>请不要将该邮件转发或复制给任何其他用户，该链接在30min内验证有效，若该用户与你无关请不要点击该邮件内的任何链接谢谢配合。";
				$result = sendMail($usr['email'],'快件管理中心的激活邮件',$Body);
			}
			
		}else{
			//$this->redirect("/login/login");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	//短信验证平台
	public function phonecheck(){
		$validate=666;//random(6);//need common
		$ch = curl_init();
		$url = "http://apis.baidu.com/baidu_communication/sms_verification_code/smsverifycode?phone=".$usr['phoneNumber']."&content=".$validate;
		$header = array(
			'apikey'=>C('API_KEY'),
		);
		// 添加apikey到header
		curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// 执行HTTP请求
		curl_setopt($ch , CURLOPT_URL , $url);
		$res = curl_exec($ch);
	}
}