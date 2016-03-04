<?php
namespace Admin\Controller;
use Think\Controller;
class EditController extends BaseController {
	/*
	*@param where (必要属性) array 关键字段(eq){"0":{key:value}}
	*@param field (必要属性如果不提交则认为不查询任何) array 需要查询字段，类型为{"0":value,……}
	*@param from (必要属性) string 查询的表（后端检验）
	*@param pagination (必要属性) int 分页
	*@param page int 页码
	*@return list 
	*/
	function query(){
		$where=I("post.where");
		$field=I("post.field");
		$from=I("post.from");
		$page=I("post.page",1);
		$pagination=I("post.pagination",20);
		//设定查询内容
		foreach($where as $i){
			$map[$i["key"]] = $i["value"];
		}
		//初始化返回
		$returns=array();
		if(in_array($from,array("orders","positions","postor","usr"))){
			$returns=getDataByKeyWords($type,$map,$from,$pagination,$field,$page);
			$res=array(response=>"query",status=>"1","list"=>$returns["list"],page=>$page,maxPage=>$returns["max"]);
		}else{
			$res=array(response=>"fail",status=>"2");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	function edit(){
		
	}
	
}