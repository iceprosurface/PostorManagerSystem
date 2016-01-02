<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$this->display("login");
    }
    public function illegalRequirement(){
		$this->display("illegalRequirement");
	}
	public function test(){
		$model=D(OrderUpdateView);
		$list=$model->find();
		$this->ajaxReturn(json_encode($list),'JSON');
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
	}
}
?>