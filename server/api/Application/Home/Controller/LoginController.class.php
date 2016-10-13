<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function index(){
    	$this->display("login");
    }
	public function login(){
		$login = getClientLToken();
		$res=isTokenL($login);
		if($res){
			$this->redirect("logined");
		}else{
			$this->display("login");
		}
	}
    public function logined(){
		$login = getClientLToken();
		$res=isThisTokenL($login);
		if(is_bool($res) && $res){
			$map['Id'] = getTokenKey($login['token']);
			$usr_info = array(
				'Id'=>$map['Id']
			);
			$usrs = M('usr');
			$usrs->create($usr_info);
			$list=$usrs->where($map)->find();
			$this->assign("list",$list);
			$this->display("logined");
		}else{
			$this->redirect("login");
		}
	}
	/*
	*验证用户名密码是否正确
	*返回值@return （错误信息提示），status（错误判断编码），（若正确返回token）token
	*说明:0:数据创建失败，1:用户名密码验证信息正确，2:用户名密码验证信息错误
	*/
	public function va(){
		$usr_info = array(
			'id'=>I('post.usrid',0),
			'psw'=>I('post.psw',0),
			'lastLogin'=>date('Y-m-d H:i:s', time()),
			'lastIp'=>get_client_ip()
			);
		$usrs = M('usr');
		$map=array(
			'id'=>$usr_info['id'],
			'psw'=>$usr_info['psw']);
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($usrs->create($usr_info)){
			if(checkUsr($map)){
				//创建token
				$token =createToken($usr_info['Id']);
				//清空token
				session(C('SESSION_KEY_TOKEN'),null);
				//写入token（重新密码登录代表重新获取令牌）
				session(C('SESSION_KEY_TOKEN'),$token);
				
				$usr['token']=$token;
				$usr['grantTime']=date('Y-m-d H:i:s', time());
				$usr['lastLogin']=date('Y-m-d H:i:s', time());
				$usr['lastIp']=get_client_ip();
				
				$list=$usrs->field(array('token','grantTime','lastLogin','lastIp'))->where($map)->save($usr);
				$list=$usrs->field(array('id','expiretime'))->where($map)->find();
				$res=array(response=>"登陆成功",status=>200);
				header('HTTP/1.1 200 ok');
				cookie(C('COOKIE_KEY_TOKEN'),array(id=>$list["id"],token=>$token),$list['expiretime']);
			}else{
				$res=array(response=>"用户名密码验证信息错误",status=>403);
				header('HTTP/1.1 403 Forbidden');
			}
		}
		$this->ajaxReturn(res,'JSON');
	}
	public function loginOut(){
		$token=getClientLToken();
		$res=isTokenL($token);
		if(is_bool($res)){
			if($res){
				//只要验证通过则清除
				session(C('SESSION_KEY_TOKEN'),null);
				//同时清除数据库缓存
				$map['usrId'] = getTokenKey($token);
				$usr_info['token']=null;
				$usrs = M('usr');
				if($usrs->create($usr_info)){
					$list=$usrs->where($map)->save($usr_info);
				}
				$res= array(response=>"登陆清除成功",status=>200);
				header('HTTP/1.1 200 ok');
			}else{
				$res= array(response=>"非法或不允许的登陆清除方式",status=>403);
				header('HTTP/1.1 403 Forbidden');
			}
		}
		$this->ajaxReturn(res ,'JSON');
	}

}
?>
