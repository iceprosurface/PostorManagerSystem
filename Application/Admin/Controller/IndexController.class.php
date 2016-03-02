<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
		$this->display(index);
		
    }
	public function login(){
		//判断登陆成功（此处只需要session 2小时，不需要记住登陆状态）
		if(isThisTokenLogin()){
			$this->redirect(login/login);
		}elseif(isPswCurrect()){
			$this->display(login/login);
		}
		$this->display(login);
    }
}