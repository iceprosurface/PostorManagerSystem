<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$this->display("login");
    }
    public function logined(){
		$this->display("logined");
	}
	public function test(){

	}
}
?>