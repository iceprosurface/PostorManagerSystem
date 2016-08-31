<?php
namespace Api\Controller;
use Think\Controller;
class ValidateController extends Controller {
    public function valodateMail(){
		$res = sendMail('775846939@qq.com','test',"<b>this is a test mail</b>");
		$this->ajaxReturn(json_encode($res),'JSON');
	}
}
?>