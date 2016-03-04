后台业务逻辑分析
==================

—— cms
|-基础控制器
	|-before：检查是否登录，未登录则拒绝操作并返回首页
	|-权限控制器
		|-查询权限等级
		|-拒绝操作
		|-操作权限管理
	|-编辑操作控制器
		|-查询操作
			|-@param where (必要属性) array 关键字段(eq){"0":{key:value}}
			|-@param field (必要属性如果不提交则认为不查询任何) array 需要查询字段，类型为{"0"=>{field,value},……}
			|-@param from (必要属性) string 查询的表（后端检验）
			|-@param pagination 分页数目
			|-@param page 页码
		|-编辑操作
			|-@param id (必要属性) int 
			|-@param type (必要属性) string 操作类型 包括以下几种类型{update,delete}
			|-@param field (如果为更新则是必要属性，填空则不操作任何字段) array 需要操作的字段，类型为{"0"=>{field,value},……}
			|-@param from (必要属性) string 查询的类型（后端检验）
|-登陆控制器
	|-后台首页
	|-登陆判断

@1 历史方案
|-订单属性操作
	|-@param id (必要属性) int 
	|-@param type (必要属性) string 操作类型 包括以下几种类型{update,delete}
	|-@param field (如果为更新则是必要属性，填空则不操作任何字段) array 需要操作的字段，类型为{"0"=>{field,value},……}
|-用户属性操作
	|-同上//重复操作
|-快递员属性操作
	|-同上//重复操作
	
@2 历史方案
|-写操作控制器
	|-……
|-读取操作控制器
	|-……
	
	