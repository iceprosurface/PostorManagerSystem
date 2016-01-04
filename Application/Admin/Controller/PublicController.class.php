<?php
namespace Admin\Controller;
use Think\Controller;
class PublicController extends Controller {
    public function index(){
        $this->show('public','utf-8');
    }
	public function illegalRequirement(){
		$this->display();
	}
}