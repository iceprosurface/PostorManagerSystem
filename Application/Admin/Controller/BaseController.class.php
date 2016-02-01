<?php
namespace Admin\Controller;
use Think\Controller;
class BaseController extends Controller {
	public function _initialize(){
		$token=getClientLToken();
		if(!isTokenL($token)){
			$this->redirect("/admin/index/login");
		}
    }
}