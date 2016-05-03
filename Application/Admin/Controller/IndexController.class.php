<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function test(){
		
		// $this->display(index);
		var_dump(getDataByKeyWords(array('key'=>'usrid','word'=>'111111','type'=>'EQ'),'orders',3,array('orderid'),1));
    }
	public function index(){
		$this->display(login); 
	}
	public function login(){
		//判断登陆成功（此处只需要session 2小时，不需要记住登陆状态）
		if(isThisTokenL()){
			$this->redirect(Edit/logined);
		}elseif(isPswCurrect()){
			$this->display(Edit/logined);
		}else{
			$this->assign('refer','你的用户名或密码错误');
		}
		// $this->display(login);
		$this->redirect(index);
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
		$usrs = M('admin');
		$map=array(
			'id'=>$usr_info['id'],
			'psw'=>$usr_info['psw']);
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($usrs->create($usr_info)){
			if(checkUsr($map)){
				//创建token
				$token =createToken($usr_info['Id']);
				//清空token
				session(C('SESSION_KEY_TOKEN_ADMIN'),null);
				//写入token（重新密码登录代表重新获取令牌）
				session(C('SESSION_KEY_TOKEN_ADMIN'),$token);
				
				$usr['token']=$token;
				$usr['grantTime']=date('Y-m-d H:i:s', time());
				$usr['lastLogin']=date('Y-m-d H:i:s', time());
				$usr['lastIp']=get_client_ip();
				
				$list=$usrs->field(array('token','grantTime','lastLogin','lastIp'))->where($map)->save($usr);
				$list=$usrs->field(array('id','expiretime'))->where($map)->find();
				$res=array(response=>"登陆成功",status=>"1");
				cookie(C('COOKIE_KEY_TOKEN_ADMIN'),array(id=>$list["id"],token=>$token),$list['expiretime']);
			}else{
				$res=array(response=>"用户名密码验证信息错误",status=>"2");
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
		// $this->redirect(Edit/logined);
	}
}