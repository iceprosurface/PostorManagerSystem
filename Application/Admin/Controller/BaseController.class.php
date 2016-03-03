<?php
namespace Admin\Controller;
use Think\Controller;
class BaseController extends Controller {
	public function _initialize(){
		$token=getAdminClientLToken();
		if(!isThisTokenL($token)){
			$this->redirect("/admin/index/login");
		}
    }
}