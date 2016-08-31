<?php
namespace Api\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$this->display("login");
    }

	public function test(){
		// $res = session(C('SESSION_KEY_TOKEN'),null);
		$res = session(C('SESSION_KEY_TOKEN'));
		// $usrs = M('positions');
		// for($i=1;$i<200;$i++){
			// $s=array(
				// 'positionId'=>$i,
				// 'haveProduct'=>false,
			// );
			// $usrs->create($s);
			// $list=$usrs->add($s);
			// echo $list."+".$s;
		// }
		$this->ajaxReturn(json_encode($res),'JSON');
	}
}
?>