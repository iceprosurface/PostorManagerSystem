<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
		
		// $this->display(index);
		var_dump(getDataByKeyWords(array('key'=>'usrid','word'=>'111111','type'=>'EQ'),,'orders',3,array('orderid'),1));
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
}