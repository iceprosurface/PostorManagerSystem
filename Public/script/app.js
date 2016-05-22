appModule = angular.module('appModule', ['ngRoute'],function($httpProvider){
	// 官方提供的类似于$.ajax形式的提交
	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	/**
	* The workhorse; converts an object to x-www-form-urlencoded serialization.
	* @param {Object} obj
	* @return {String}
	*/ 
	var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	  
	for(name in obj) {
	  value = obj[name];
		
	  if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
		  subValue = value[i];
		  fullSubName = name + '[' + i + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value instanceof Object) {
		for(subName in value) {
		  subValue = value[subName];
		  fullSubName = name + '[' + subName + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}
	  
	return query.length ? query.substr(0, query.length - 1) : query;
	};

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});
//拉取工厂，用于从服务端拉取信息
appModule.factory('ipcService', function($http,$q) {

	return {
		"positions":(page)=>
		{
			page = isNaN(parseInt(page)) ? 1 : parseInt(page);
			var defer = $q.defer();
			$http.post('/admin/edit/query', {
				
				"field": ["positionId","haveProduct"],
				"from": "positions",
				"pagination": 40,
				"page": page
			}).success((data)=>{
				defer.resolve(JSON.parse(data)["list"]);
			}).error((err)=>{
				defer.reject(err);
			});
			return defer.promise;
		},
		"positionPages":()=>
		{
			var defer = $q.defer();
			$http.post('/admin/edit/maxPages', {
				"pagination": 40
			}
			).success((data)=>{
				defer.resolve(JSON.parse(data));
			}).error((err)=>{
				defer.reject(err);
			});
			return defer.promise;
		},
		"unnoticedOrders":(page)=>
		{
			var defer = $q.defer();
			$http.post('/admin/edit/query', {
				"where":[{"key":"haveNoticed","value":0}],
				"field": ["orderId","usrPhoneNumber"],
				"from": "orders",
				"pagination": 20,
				"page": page
			}
			).success((data)=>{
				defer.resolve(JSON.parse(data)["list"]);
			}).error((err)=>{
				defer.reject(err);
			});
			return defer.promise;
		},
		"order":(orderid)=>
		{
			var defer = $q.defer();
			$http.post('/admin/edit/query', {
				"where":[{"key":"orderId","value":orderid}],
				"field": ["orderId","usrPhoneNumber","orderInfo","usrId","positionId","importTime","exportTime"],
				"from": "orders"
			}
			).success((data)=>{
				var json = JSON.parse(data);
				if(json["status"]==1){
					defer.resolve(json["list"]);
				}else if(json["status"]==2){
					defer.resolve({"response":json["response"],"failed":true})
				}
				
			}).error((err)=>{
				defer.reject(err);
			});
			return defer.promise;
		},
		"usr":(name)=>
		{
			var defer = $q.defer();
			$http.post('/admin/edit', {
				"where":[{"key":"name","value":name}],
				"field": ["usrId","usrPhoneNumber","psw","lastIp","name","lastLogin"],
				"from": "usr"
			}
			).success((data)=>{
			    defer.resolve(JSON.parse(data));
			}).error((err)=>{
			    	defer.reject(err);
			});
			return defer.promise;
		}
	}
});

// 路由
appModule.config(function($routeProvider){
	$routeProvider.
		when("/",{
			controller:'IndexController',
			templateUrl:'/admin/public/index'
		}).when("/index",{
			controller:'IndexController',
			templateUrl:'/admin/public/index'
		}).when("/containerStatus",{
			controller:'containerStatusController',
			templateUrl:'/admin/public/containerStatus'
		}).when("/unnoticed",{
			controller:'unnoticedController',
			templateUrl:'/admin/public/unnoticed'
		}).when("/backOrder",{
			controller:'backOrderController',
			templateUrl:'/admin/public/backOrder'
		}).when("/usrStatus",{
			controller:'usrStatusController',
			templateUrl:'/admin/public/usrStatus'
		}).when("/usrOrder",{
			controller:'usrOrderController',
			templateUrl:'/admin/public/usrOrder'
		}).when("/orderConf",{
			controller:'orderConfController',
			templateUrl:'/admin/public/orderConf'
		});
		
});
//库存系统控制器
var containerStatusController = appModule.controller('containerStatusController',
	function($scope,ipcService){
		//库存箱子编号
		$scope.nowPage = "1";
		ipcService.positions($scope.nowPage).then((data)=>{
			$scope.positions = data ;
		});
		ipcService.positionPages($scope.nowPage).then((data)=>{
			$scope.pages = data;
		});
		//监视库存编号，如果有改变，则更新
		$scope.$watch('nowPage',(newVal)=>{
			// $scope.nowPage = newVal;
			ipcService.positions($scope.nowPage).then((data)=>{
				$scope.positions = data ;
			});
		});
	}
);
//未发送信息列表控制器
var unnoticedController = appModule.controller('unnoticedController',
	function($scope,ipcService){
		//页码
		$scope.nowPage = "1";
		ipcService.unnoticedOrders($scope.nowPage).then((data)=>{
			$scope.unnoticedOrders = data;
		});
		//监视页码，如果有改变，则更新
		$scope.$watch('nowPage',(newVal)=>{
			ipcService.unnoticedOrders($scope.nowPage).then((data)=>{
				$scope.unnoticedOrders = data ;
			});
		});
	}
);
var backOrderController = appModule.controller('backOrderController',
	function($scope){
		
	}
);
//用户信息控制器
var usrStatusController = appModule.controller('usrStatusController',
	function($scope,ipcService){
		$scope.datahave = false;
		ipcService.usr(name).then( ( data ) => {
		
			$scope.usr = data["list"];

			$scope.datahave = parseInt( data["lenght"] ) > 0 ? true : false;
		
		});
	}
);
//用户订单修改控制器
var usrOrderController = appModule.controller('usrOrderController',
	function($scope,ipcService,$http){
		//订单号
		$scope.orderid = "";
		ipcService.order($scope.nowPage).then((data)=>{
			$scope.order = data;
		});
		// 监视订单号，如果满足12位数字则查询（减小压力）
		$scope.$watch('orderid',(newVal)=>{
			var regex = /\b\d{12}\b/g;//正则表达式，可修改为需要的内容
			if(newVal.toString().match(regex)!=null){
				ipcService.order($scope.orderid).then((data)=>{
					$scope.order = data;
				});
			}
			
		});
	}
);
var orderConfController = appModule.controller('orderConfController',
	function($scope){
				
	}
);
var IndexController = appModule.controller('IndexController',
	function($scope){
		
	}
);
