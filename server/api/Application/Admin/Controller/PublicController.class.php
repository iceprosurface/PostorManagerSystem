<?php
namespace Admin\Controller;
use Think\Controller;
class PublicController extends Controller {
    public function index(){
		$this->display(index);
	}
}