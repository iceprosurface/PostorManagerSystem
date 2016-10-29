(function(angular) {
    // the rest of your file goes here...
    var appModule = angular.module('appModule', ['ngRoute'], ['$httpProvider', function($httpProvider) {
        // 官方提供的类似于$.ajax形式的提交
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';

                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]);
    //拉取工厂，用于从服务端拉取信息
    appModule.factory('ipcService', ['$http', '$q', function($http, $q) {

        return {
            positions: function(page) {
                page = isNaN(parseInt(page)) ? 1 : parseInt(page);
                return $http.post('/api/admin/query', {
                    "field": ["positionId", "haveProduct"],
                    "from": "positions",
                    "pagination": 35,
                    "page": page
                });
            },
            positionPages: function() {
                return $http.post('/api/admin/maxPages', {
                    "pagination": 35
                });
            },
            unnoticedOrders: function(page) {
                return $http.post('/api/admin/query', {
                    "where": [{
                        "key": "haveNoticed",
                        "value": 0
                    }],
                    "field": ["orderId", "usrPhoneNumber"],
                    "from": "orders",
                    "pagination": 20,
                    "page": page
                });
            },
            order: function(orderid) {
                return $http.post('/api/admin/query', {
                    "where": [{
                        "key": "orderId",
                        "value": orderid
                    }],
                    "field": ["orderId", "usrPhoneNumber", "orderInfo", "usrId", "positionId", "importTime", "exportTime"],
                    "from": "orders"
                });
            },
            usr: function(name) {
                return $http.post('/api/admin/query', {
                    "where": [{
                        "key": "name",
                        "value": name
                    }],
                    "field": ["id", "phoneNumber", "psw", "lastIp", "name", "email", "lastLogin"],
                    "from": "usr"
                });
            },
			editUsr: function(data){
				return $http.post('/api/admin/editUsr',{
					"usr":data
				});
			},
			editContainer: function(data){
				return $http.post('/api/admin/editContainer',{
					"positions":data
				});
			},
			editOrder: function(data){
				return $http.post('/api/admin/editOrder',{
					"order":data
				});
			},
            adminName: function() {
                return $http.post('/api/admin/getRootName', {});
            }
        };
    }]);

    // 路由
    appModule.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when("/", {
            controller: 'IndexController',
            templateUrl: '/tpl/admin/index.html'
        }).when("/index", {
            controller: 'IndexController',
            templateUrl: '/tpl/admin/index.html'
        }).when("/containerStatus", {
            controller: 'containerStatusController',
            templateUrl: '/tpl/admin/containerStatus.html'
        }).when("/unnoticed", {
            controller: 'unnoticedController',
            templateUrl: '/tpl/admin/unnoticed.html'
        }).when("/backOrder", {
            controller: 'backOrderController',
            templateUrl: '/tpl/admin/backOrder.html'
        }).when("/usrStatus", {
            controller: 'usrStatusController',
            templateUrl: '/tpl/admin/usrStatus.html'
        }).when("/usrOrder", {
            controller: 'usrOrderController',
            templateUrl: '/tpl/admin/usrOrder.html'
        }).when("/orderConf", {
            controller: 'orderConfController',
            templateUrl: '/tpl/admin/orderConf.html'
        });

    }]);
    //库存系统控制器
    var containerStatusController = appModule.controller('containerStatusController', ['$scope', 'ipcService', function($scope, ipcService) {
        //库存箱子编号
        $scope.nowPage = "1";
		$scope.onloading = true;
        var loadPositions = function() {
			$scope.onloading = true;
            ipcService.positions($scope.nowPage).then(function(data) {
                $scope.positions = data.data.list;
				$scope.onloading = false;
                $scope.positions.unshift({});
            });
		};
		$scope.confirm = function(){
			ipcService.editContainer($scope.positions).then(function(data){

				alert('success');
			},function(data){
				alert("some thing error ,you may need a second try");	
			});
		};
		ipcService.positionPages().then(function(data) {
			var pages = [];
			for(var i = 1; i<= parseInt(data.data);i++){
				pages.push({'id':i});
			}
			$scope.pages = pages;
	   });

        //监视库存编号，如果有改变，则更新
        $scope.$watch('nowPage', loadPositions);
    }]);
    //msgController
    var msgController = appModule.controller('msgController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.username = "root";
        ipcService.adminName().then(function(data) {
            $scope.username = data.data.name;
        });
    }]);
    //未发送信息列表控制器
    var unnoticedController = appModule.controller('unnoticedController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.datahave = false;
		$scope.onloading = true;
        //页码
        $scope.nowPage = "1";
        var load = function() {
			$scope.onloading = true;
            ipcService.unnoticedOrders($scope.nowPage).then(function(data) {
				$scope.onloading = false;
                $scope.unnoticedOrders = data.data.list;
				if($scope.unnoticedOrders){
					$scope.datahave = parseInt($scope.unnoticedOrders.length) > 0;
				}
            });
        };
        //监视页码，如果有改变，则更新
        $scope.$watch('nowPage', load);
    }]);
    var backOrderController = appModule.controller('backOrderController', ['$scope', function($scope) {

    }]);
    //用户信息控制器
    var usrStatusController = appModule.controller('usrStatusController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.datahave = false;
        var load = function() {
            ipcService.usr($scope.usrid).then(function(data) {
                $scope.usr = data.data.list[0];

                $scope.datahave = parseInt(data.data['list'].length) > 0;
            });
        };
        $scope.$watch('usrid', function(newVal) {
            var regex = /\b\w{6,12}\b/g; //正则表达式，可修改为需要的内容
            if (newVal && newVal.toString().match(regex) !== null) {
                load();
            }
        });
		$scope.confirm = function(){
			ipcService.editUsr($scope.usr).then(function(data) {
				//resove
				alert("success");
				$scope.datahave = false;
			},function(){
				//reject
				alert("false,you may need a second try");
			});
		};
    }]);
    //用户订单修改控制器
    var usrOrderController = appModule.controller('usrOrderController', ['$scope', 'ipcService', '$http', function($scope, ipcService, $http) {
        //订单号
        $scope.orderid = "";
        //表单显示情况
        $scope.datahave = false;
		$scope.onloading = true;
        var load = function() {
			$scope.onloading = true;
            ipcService.order($scope.orderid).then(function(data) {
				$scope.onloading = false;
                $scope.order = data.data.list[0];
				if($scope.order){
					$scope.datahave = data.data.list[0];
				}else{
					$scope.datahave = false;
				}
            });
        };
        // 监视订单号，如果满足12位数字则查询（减小压力）
        $scope.$watch('orderid', function(newVal) {
            var regex = /\b\d{12,20}\b/g; //正则表达式，可修改为需要的内容
            if (newVal.toString().match(regex) !== null) {
                load();
            }else{
				$scope.onloading = false;
			}
        });
		$scope.confirm = function(){
			ipcService.editOrder($scope.order).then(function(data) {
				//resove
				alert("success");
				$scope.datahave = false;
			},function(){
				//reject
				alert("false,you may need a second try");
			});
		};
    }]);
    var orderConfController = appModule.controller('orderConfController', ['$scope', 'ipcService', '$http', function($scope, ipcService, $http) {
        $scope.datahave = false;
        var load = function() {
            ipcService.order($scope.orderid).then(function(data) {
                if(data.data.list){
					$scope.datahave = parseInt(data.data.list.length) > 0;
				}else{
					$scope.datahave = false;
				}
                $scope.order = data.data.list[0];
            });
        };
        //首次进入不需要重载
        load();
        //监视订单号，变化则重载
        $scope.$watch('orderid', load);
		
    }]);
    var IndexController = appModule.controller('IndexController', ['$scope', function($scope) {

    }]);
    appModule.directive("edit", ['$document', function($document) {
        return {
            restrict: 'AE',
            scope: {
                edata: '='
            },
            template: `<div ng-show="isEditing"><div class="input-control"><input class="input" ng-model="edata"></div><button ng-click="confirm()" class="button primary">确认</button></div><div ng-click="edit()" ng-hide="isEditing">编辑</div>`,
            link: function(scope, element, attrs, ngModel) {
                scope.edit = function() {
                    scope.isEditing = true;
                };
                scope.confirm = function() {
                    scope.isEditing = false;
                };

            }
        }
    }]);
	appModule.directive("cedit", ['$document', function($document) {
        return {
            restrict: 'AE',
            scope: {
                cdata: '=',
				text: '='
            },
            template: `<div ng-class="{'bg-lime':(cdata=='0'),'bg-crimson':(cdata!='0')}" ng-bind="text" ng-click="toggle()"></div>`,
            link: function(scope, element, attrs, ngModel) {
                scope.toggle = function() {
					if(scope.cdata == '0'){
						scope.cdata = '1';	
					}else{
						scope.cdata = '0';	
					}
                };
                scope.confirm = function() {

                };

            }
        }
    }]);

}(angular));
