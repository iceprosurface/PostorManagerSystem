<?php
namespace Api\Controller;
use Think\Controller;
class BaseController extends Controller {

	public function _initialize(){
		$token=getClientLToken();
		if(!isTokenL($token)){
			$this->redirect("login/login");
		}
    }
}