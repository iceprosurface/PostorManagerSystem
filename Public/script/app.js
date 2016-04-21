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
			}).success(function(data) {
				defer.resolve(JSON.parse(data)["list"]);
			}).error(function(err) {
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
			).success(function(data) {
				defer.resolve(JSON.parse(data));
			}).error(function(err) {
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

var containerStatusController = appModule.controller('containerStatusController',
	function($scope){
		
	}
);
var unnoticedController = appModule.controller('unnoticedController',
	function($scope){
		
	}
);
var backOrderController = appModule.controller('backOrderController',
	function($scope){
		
	}
);
var usrStatusController = appModule.controller('usrStatusController',
	function($scope){
		
	}
);
var usrOrderController = appModule.controller('usrOrderController',
	function($scope){
		
	}
);
var orderConfController = appModule.controller('orderConfController',
	function($scope){
		
	}
);
var IndexController = appModule.controller('IndexController',
	function($scope,ipcService){
		$scope.nowPage = "1";
		ipcService.positions($scope.nowPage).then(function(data) {
			$scope.positions = data ;
		});
		ipcService.positionPages($scope.nowPage).then(function(data) {
			$scope.pages = data;
		});
		$scope.$watch('nowPage',function(newVal){
			$scope.nowPage = newVal;
			ipcService.positions($scope.nowPage).then(function(data) {
				$scope.positions = data ;
			});
		});
	}
);