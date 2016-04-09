var spicepadApp = angular.module('spicepadApp', ['ngRoute']);

    // configure our routes
    spicepadApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/main', {
                templateUrl : 'app/views/chat.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/', {
                templateUrl : 'app/views/register.html',
                controller  : 'registerController'
            })
            .when('/error', {
                templateUrl : 'app/views/not-registered.html'
            }).
            otherwise({
				redirectTo : '/error'
			});
        
    });

    spicepadApp.controller('mainController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {

        $scope.messages = [];

        $scope.refreshMessages = function() {
            $http.get('rest/message/get?flightDateId=' + $rootScope.flightDateId).then(function(response) {
                $scope.messages = response.data.slice().reverse();
            }, function() {
            });
        };
        $scope.refreshMessages();

        $scope.messageRequest = {};
    	$scope.messageRequest.message = "";
        $scope.messageRequest.flightDateId = $rootScope.flightDateId;
        $scope.messageRequest.userId = $rootScope.userId;
    	$scope.send = function() {
            $http.post('rest/message/new', $scope.messageRequest).then(function() {
            $scope.messageRequest.message = "";
            $scope.refreshMessages();
            }, function() {
            });    
    	};
    		
    }]);

    spicepadApp.controller('registerController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
        $scope.registerRequest = {};
        $scope.registerRequest.flightNo = $rootScope.flightNo;
        $scope.registerRequest.date = $rootScope.date;
        $scope.registerRequest.facebookUserId=2332423423112131;
        $scope.register = function() {
            $http.post('rest/register/new', $scope.registerRequest).then(function(response) {
                $rootScope.userId = response.data.id;
                $rootScope.flightDateId = response.data.flightDateId;
                $location.path('/main');
            }, function() {
                $location.path('/error');
            });    
        };
        
        $scope.message = 'Everyone come and see how good I look!';
    }]);
    
    spicepadApp.controller('BaseController',
    	    ['$scope', '$rootScope', function($scope, $rootScope) {
    	    	$scope.init = function(flightNo, date) {
    				$rootScope.flightNo = flightNo;
    				$rootScope.date = date;
    	    	};
    	    	
    	    }]);
    	    