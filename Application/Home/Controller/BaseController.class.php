<?php
namespace Home\Controller;
use Think\Controller;
class BaseController extends Controller {

	public function _initialize(){
		$token=getClientLToken();
		if(!isThisTokenL($token)){
			$this->redirect("login/login");
		}
    }
}