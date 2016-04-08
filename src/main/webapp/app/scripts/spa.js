var app = angular.module('spa', [ 'ngRoute', 'ngResource', 'ui' ])
.config(
		[ '$resourceProvider', '$locationProvider', '$routeProvider',
				function($resourceProvider, $locationProvider, $routeProvider) {

					$routeProvider.

					when('/home', {
						templateUrl : 'app/template/home.html',
						controller : HomeCtrl
					}).//

					when('/apin/verify', {
						templateUrl : 'app/template/apin_verify.html',
						controller : APINCtrl
					}).//

					when('/apin/register', {
						templateUrl : 'app/template/apin_register.html',
						controller : APINCtrl
					}).//

					when('/apin/reset', {
						templateUrl : 'app/template/apin_reset.html',
						controller : APINCtrl
					}).//

					when('/bill', {
						templateUrl : 'app/template/bill_list.html',
						controller : BillCtrl
					}).//
					when('/registeredHome', {
						templateUrl : 'app/template/registered_home.html',
						controller : preHomeCtrl
					}).//
					when('/unregistered', {
						templateUrl : 'app/template/unregistered_home.html',
						controller : preHomeCtrl
					}).//
					
					when('/error', {
						templateUrl : 'app/template/billpay_error.html',
						controller	: errorCtrl
					}).//
					
					otherwise({
						redirectTo : '/home'
					});

				} ]);