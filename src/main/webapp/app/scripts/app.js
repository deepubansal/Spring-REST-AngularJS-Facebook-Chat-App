var spicepadApp = angular.module('spicepadApp', ['ngRoute']);

    // configure our routes
    spicepadApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/chat.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/register', {
                templateUrl : 'app/views/register.html',
                controller  : 'registerController'
            }).
            otherwise({
				redirectTo : '/'
			});
        
    });

    spicepadApp.controller('mainController', function($scope) {
        
        $scope.message = 'Everyone come and see how good I look!';
    });

    spicepadApp.controller('registerController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });