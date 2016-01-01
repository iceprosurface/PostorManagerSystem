<?php
namespace Home\Controller;
use Think\Controller;
class ImportController extends Controller {
	//快件detail界面
	public function detail(){
		$this->display(detail);
	}
	//快件录入界面
	public function import(){
		$this->display(import);
	}
	//快件签收界面
	public function check(){
		$this->display(check);
	}
	/*
	*验证是否存在
	*返回值@return response（错误信息提示），status（错误判断编码）
	*说明:0:数据创建失败，1:快件注册成功，2:快件注册失败
	*/
    public function va(){
    	$import_info =array(
				'orderId'=>I('post.orderId'),
				'orderInfo'=>I('post.orderInfo'),
				'usrPhoneNumber'=>I('post.usrPhoneNumber'),
				'usrId'=>I('post.usrId'),
				'usrName'=>I('post.usrName'),
				'positionId'=>I('post.positionId'),
				'haveProduct'=>true,
				'postorId'=>I('post.postorId'),
				'importTime'=>date('Y-m-d H:i:s', time()),
				
		);
    
		$orders = M('orders');
		$positions = M('positions');
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($orders->create($import_info) & $positions->create($import_info)){
			$import_result=($orders->add($import_info))&($positions->where($import_info['positionId'])->save($import_info));
			if($import_result !== false){
				$res=array(response=>"注册成功",status=>"1",orderId=>$import_info['orderId']);
			}else{
				$res=array(response=>"注册失败",status=>"2");
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*读取快件信息
	*返回值@return response（错误信息提示），status（错误判断编码），无错误则额外返回list
	*说明:0:数据创建失败，10:未能查找到指定订单号，11:检索并成功返回指定订单号
	*/
	public function getOrder(){
		$import_info =array('orderId'=>I('post.orderId'));
		$orders = M('orders');
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($orders->create($import_info)){
			$map['orderId']=$import_info['orderId'];
			$list=$orders->where($map)->find();
			if(empty($list)){
				$res=array(response=>"未能检索到指定订单。错误代码:10。",status=>"10");
			}else{
				$res=array(response=>"已检索到指定订单号。",status=>"11",result=>$list);
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*读取快件列表
	*返回值@return response（错误信息提示），status（错误判断编码），无错误则额外返回list
	*说明:0:数据创建失败，10:未能查找到任何订单号，11:检索并成功返回指定分页订单号，12:
	*/
	public function getOrderList(){
		$import_info =array('orderId'=>I('post.orderId'));
		$orders = M('orders');
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($orders->create($import_info)){
			$map['orderId']=$import_info['orderId'];
			$list=$orders->where($map)->select();
			$res=empty($list)?array(response=>"未能检索到指定订单。",status=>"10"):array(response=>"已检索到指定订单号。",status=>"11",result=>$list);
			// if(empty($list)){
				// $res=array(response=>"未能检索到指定订单。",status=>"10");
			// }else{
				// list分页操作
				// $res=array(response=>"已检索到指定订单号。",status=>"11",result=>$list);
			// }
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*待签收快件列表
	*返回值@return response（错误信息提示），status（错误判断编码），无错误则额外返回list
	*说明:0:数据创建失败，10:未能查找到任何订单号，11:检索并成功返回指定分页订单号
	*/
	public function getUncheckList(){
		$import_info =array(
			'usrId'=>I('post.usrId')
			);
		$orders = M('orders');
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($orders->create($import_info)){
			$map['usrId']=$import_info['usrId'];
			$map['haveSAR']=false;
			$list=$orders->where($map)->select();
			$res=array(response=>"已检索到指定订单号。",status=>"11",result=>$list);
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*对指定快件签收
	*返回值@return response（错误信息提示），status（错误判断编码）
	*说明:0:数据创建失败，1:已经成功取件，2:取件失败
	*/
	public function checkList(){
		$checkOrder = I('post.checkOrder');
		$import_info = array('usrId'=>I('post.usrId'));
		if( is_array( $checkOrder ) ){
			$orders = M('orders');
			$positions = M('positions');
			$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
			//获得快件订单对应的库存位置
			$map['orderId']=array('in',$checkOrder);
			$check_list=$orders->field(array('positionId'))->where($map)->select();
			//转化为标准数列
			foreach($check_list as $i){
				$list[]=$i['positionid'];
			}
			if($orders->create($import_info) & $positions->create($check_list)){
				$data['haveSAR']=true;
				$data['exportTime']=date('Y-m-d H:i:s', time());
				$data['haveProduct']=false;
				$orders_result=$orders->field(array('orderId','orderInfo','exportTime','haveSAR'))->where($map)->save($data);
				//更改map条件为positionid
				$map['positionId']=array('in',$list);
				$positions_result=$positions->where($map)->save($data);
				$res=($orders_result&$positions_result)?array(response=>"已经成功取件",status=>"1"):array(response=>"取件失败",status=>"2");
			}
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	
	
}

?>