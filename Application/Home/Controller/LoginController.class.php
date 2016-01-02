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
		if(is_bool($res) && $res){
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
			'Id'=>I('post.usrid'),
			'psw'=>I('post.psw'),
			'lastLogin'=>date('Y-m-d H:i:s', time()),
			'lastIp'=>get_client_ip()
			);
		$usrs = M('usr');
		$map=array(
			'Id='=>$usr_info['Id'],
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
				$usr_info['token']=$token;
				$usr_info['grantTime']=date('Y-m-d H:i:s', time());
				$list=$usrs->where($map)->save($usr_info);
				$res=array(response=>"登陆成功",status=>"1");
				cookie('login',array(id=>$usr_info["id"],token=>$token),3600);
			}else{
				$res=array(response=>"用户名密码验证信息错误",status=>"2");
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	
	public function tlogin(){
		$token = getClientLToken();
		$res=isTokenL($token);
		if(is_bool($res)){
			$res= $res?array(response=>"token登陆成功。",status=>"1"):array(response=>"token登陆失败。",status=>"0");
		}else{
			$res= array(response=>"token登陆成功,但token信息需要更新。",status=>"3",cookie=>array('name'=>$usr_info['name'],'token'=>$res));
		}
		
		$this->ajaxReturn(json_encode($res),'JSON');
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
				$res= array(response=>"登陆清除成功",status=>"1");
			}else{
				$res= array(response=>"非法或不允许的登陆清除方式",status=>"2");
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}

}
?>