var spicepadApp = angular.module('spicepadApp', ['ngRoute', 'luegg.directives']);

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

    spicepadApp.controller('mainController', ['$scope', '$rootScope', '$location', '$http',
    '$anchorScroll', '$timeout', function($scope, $rootScope, $location, $http, $anchorScroll, $timeout) {

        $scope.messages = [];

        $scope.refreshMessages = function() {
            $http.get('rest/message/get?flightDateId=' + $rootScope.flightDateId, {timeout : 2000}).then(function(response) {
                $scope.messages = response.data.slice().reverse();
            }, function() {
            });
        };
        $timeout(function() {
            $scope.refreshMessages();
            }, 2000);

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




        FB.init({
          appId      : '1577073059253708',
          xfbml      : true,
          version    : 'v2.5'
        });

        function onLogin(response) {
            if (response.status == 'connected') {
                $rootScope.fbUserId = response.authResponse.userID;
                FB.api('/me?fields=first_name', function(data) {
                    var welcomeBlock = document.getElementById('fb-welcome');
                    welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
                  });
                onLoggedIn();
            }
        }

      FB.getLoginStatus(function(response) {
        // Check login status on load, and if the user is
        // already logged in, go directly to the welcome message.
        if (response.status == 'connected') {
          onLogin(response);
        } else {
          // Otherwise, show Login dialog first.
          FB.login(function(response) {
            onLogin(response);
          }, {scope: 'user_friends, email'});
        }
      });  
      


        var onLoggedIn = function() {
        $scope.registerRequest = {};
        $scope.registerRequest.flightNo = $rootScope.flightNo;
        $scope.registerRequest.date = $rootScope.date;
        $scope.registerRequest.facebookUserId=$rootScope.fbUserId;

        $http.get('rest/user/get?fbUserId=' + $rootScope.fbUserId).then(function(response) {
            if (response.data) {
                $rootScope.userId = response.data.id;
                $rootScope.displayName = response.data.displayName;
                $rootScope.flightDateId = response.data.flightDateId;
                $location.path('/main');
            }
         }, function() {});
        $scope.register = function() {
            $http.post('rest/user/new', $scope.registerRequest).then(function(response) {
                $rootScope.userId = response.data.id;
                $rootScope.displayName = response.data.displayName;
                $rootScope.flightDateId = response.data.flightDateId;
                $location.path('/main');
            }, function() {
                $location.path('/error');
            });    
        };



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
    	    