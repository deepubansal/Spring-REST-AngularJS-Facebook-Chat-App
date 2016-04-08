'use strict';

function HomeCtrl($rootScope, $scope, $http) {

	var afterAuthorization = function(response) {
		$(".alert").hide();
		$rootScope.FBUserID = response.id;
		$rootScope.FBUserFirstName = response.name;

		if ($rootScope.SrcApp == 'NB') {

			if ($rootScope.UserStatus == 'Registered') {
				$scope.loadPage("/apin/reset");
			} else {
				$scope.loadPage("/apin/register");
			}

		} else {
			$scope.loadPage("/apin/verify");
		}

		$rootScope.$apply();

	}
	var fbAppConfig = $rootScope.appConfig.fbAppConfig;
	doFacebookAuthorize(afterAuthorization, fbAppConfig, $http, $scope, $rootScope);

}

function errorCtrl($rootScope, $scope, $http) {
	//$(".alert").hide();
	$scope.loadPage("/error");
}

function APINCtrl($rootScope, $scope, $resource, $location) {

	$scope.data = {};

	$scope.reloadCaptcha = function() {
		$scope.captchaUrl = $scope.API_BASE_URL +'/user/captcha/' + $rootScope.FBUserID + '?cb=' + new Date().getTime(); 
	}
	$scope.reloadCaptcha();
	$scope.registerAPIN = function() {
		$(".alert").hide();
		if (!validate($scope)) {
			return;
		}
		$scope.data.confirmapin = $scope.data.newapin = cl($scope.data.newapin, $rootScope.accessToken);
		var userRequest = {};
		
		userRequest.accessToken = $rootScope.accessToken;
		userRequest.apin = $scope.data.newapin;
		userRequest.fbUserId = $rootScope.FBUserID;
		

		$resource($scope.API_BASE_URL + //
		'/user/register').//
		save(userRequest,
			function success(data) {
	
				$rootScope.message = data.message;
	
				if (data.status == "SUCCESS") {
					showAlert('success');
					$scope.loadPage("/apin/verify");
				} else {
					showAlert('error');
				}
			}, //

			function error(data) {
	
				$rootScope.message = data.message;
				showAlert('error');
			});

	};

	$scope.verifyAPIN = function() {
		$(".alert").hide();

		$scope.data.apin = hashSha256(hashSha256($scope.data.apin) + $scope.data.captcha);
		var userRequest = {};
		userRequest.fbUserId = $rootScope.FBUserID;
		userRequest.captcha = $scope.data.captcha;
		userRequest.apin = $scope.data.apin;
		$resource($scope.API_BASE_URL + //
		'/user/login').//
		save(userRequest, function success(data) {

			$rootScope.message = data.message;

			$scope.data.captcha = "";
			$scope.data.apin ="";
			if (data.status == "SUCCESS") {
				$(".alert").hide();
				$rootScope.navigator = true;
				$rootScope.authtoken=data.message;
				var userRequest = {};
				userRequest.accessToken = $rootScope.authResponse['accessToken'];
				$resource($scope.API_BASE_URL + '/user/refreshaccesstoken').
				save(userRequest, 
						function success(data) {
							console.log("Access Token Is Updated For Fb UserId " + $rootScope.authResponse['userID']);
						},
						function error(data) {
							console.log("Access Token could not be updated");
						});
				$scope.loadPage("/bill");
			} else {
				$scope.reloadCaptcha();
				showAlert('error');
			}
		});
	};

	$scope.resetAPIN = function() {

		$(".alert").hide();
		if (!validate($scope)) {
			return;
		}

		$scope.data.confirmapin = $scope.data.newapin = cl($scope.data.newapin, $rootScope.accessToken);
		var userRequest = {};
		userRequest.accessToken = $rootScope.accessToken;
		userRequest.apin = $scope.data.newapin;
		userRequest.fbUserId = $rootScope.FBUserID;

		$resource($scope.API_BASE_URL + //
		'/user/reset').//
		save(userRequest,
			function success(data) {
	
				$rootScope.message = data.message;
	
				if (data.status == "SUCCESS") {
					showAlert('success');
					$scope.loadPage("/apin/verify");
				} else {
					showAlert('error');
				}
			}, //
	
			function error(data) {
	
				$rootScope.message = data.message;
				showAlert('error');
			});
	};

}

function preHomeCtrl($rootScope, $scope, $http, $location) {
	$scope.fIdReqId = $rootScope.fIdReqId;
	$scope.isRegistered = $rootScope.isRegistered;

	$scope.register = function() {
		$http.post($scope.API_BASE_URL + '/customer/register', $scope.fIdReqId)
				.success(function(data, status, headers, config) {
					$(".alert").hide();
					var redirectLocation = headers('Location');
					// Browser Alert Box Not Able To Change Stylling
					alert($rootScope.appConfig.privacyPolicyMessage);
					window.open(redirectLocation);
				})
				.error(function(data, status, headers, config) {
					$(".alert").hide();
					
					if(status=='400'||status=='500'){
						$scope.loadPage("/unregistered");
					}
					else if(status=='402'){
						$scope.loadPage("/error");
					}
					else if(status=='409'){
						$scope.loadPage("/registeredHome");
					}
					else{
						$scope.loadPage("/unregistered");
					}
					
					$rootScope.message = data;
					showAlert('error');
				});

	};

	$scope.setResetPassword = function() {
		$http.post($scope.API_BASE_URL + '/customer/setpassword',
				$scope.fIdReqId).success(
				function(data, status, headers, config) {
					$(".alert").hide();
					var redirectLocation = headers('Location');
					window.open(redirectLocation);
				})

		.error(function(data, status, headers, config) {
			$(".alert").hide();
			
			if(status=='401'|| status=='500'){
				$scope.loadPage("/registeredHome");
			}
			else if(status=='402'){
				$scope.loadPage("/error");
			}
			else if(status=='404'){
				$scope.loadPage("/unregistered");
			}
			else{
				$scope.loadPage("/registeredHome");
			}
				
			$rootScope.message = data;
			showAlert('error');
		});

	};

	$scope.deregister = function() {
		$('#indicator').show();
		$http.post($scope.API_BASE_URL + '/customer/deregister',
				$scope.fIdReqId).success(
						
				function(data, status, headers, config) {
					$('#indicator').hide();
					$(".alert").hide();
					$rootScope.message = data;
					showAlert('success');
					$scope.loadPage("/unregistered");
				})

		.error(function(data, status, headers, config) {
			$('#indicator').hide();
			$(".alert").hide();
			
			if(status=='500' || status=='401'){
				$scope.loadPage("/registeredHome");
			}
			else if(status=='402'){
				$scope.loadPage("/error");
			}
			else if(status=='404'){
				$scope.loadPage("/unregistered");
			}
			else{
				$scope.loadPage("/registeredHome");
			}
			
			$rootScope.message = data;
			showAlert('error');
		});

	};
}

function BillCtrl($rootScope, $scope, $resource, $http, $location) {
	$scope.selectedTab = "Unpaid";
	$scope.nowPaidTransIds = [];
	
	if ($rootScope.navigator == true) {

		$scope.fetchUnpaidBill = function() {
			$(".alert").hide();

			$('#indicator').show();

			$resource($scope.API_BASE_URL + '/bill/unpaid')
					.//
					get(

							function success(data) {

								$('#indicator').hide();

								if (data.status == "SUCCESS") {
									$scope.missedBills = [];
									var unpaidBills = angular
											.fromJson(data.message);

									angular
											.forEach(
													unpaidBills,
													function(unpaidBill, key) {

														if (unpaidBill.PaymentStatus == 'MISSED') {
															$scope.missedBills
																	.push(unpaidBill);
														} else {
															$scope.paybleBills[unpaidBill.BillNumber] = unpaidBill;
														}

													});
								} else {

									$rootScope.message = data.message;
									showAlert('error');

								}

							},

							//
							function() {
								$('#indicator').hide();
							});

		};

		$scope.fetchPaidBill = function() {

			$('#indicator').show();

			$resource($scope.API_BASE_URL + '/bill/paid').//
			get(

			function success(data) {

				$('#indicator').hide();

				if (data.status == "SUCCESS") {

					$scope.paidBills = angular.fromJson(data.message);

				} else {

					$rootScope.message = data.message;
					showAlert('error');

				}

			},

			//
			function() {
				$('#indicator').hide();
			});

		};


		$scope.showPayPopup = false;
		$scope.selectedAccountIndex = 0;
		$scope.onPayNowClick = function(bill) {
			$(".alert").hide();
			$scope.accountNoAndBalance=[];
			$scope.selectedBill = bill;
			if($scope.selectedBill.ThresholdAmount == "Y"){
				var netBankingURL = $rootScope.appConfig.netBankingURL;
				window.open(netBankingURL);
				$rootScope.message= "Bill Value Exceeds Threshold Limit: Rs."+$rootScope.appConfig.thresholdAmount+", You Are Redirected To YesBank Net Banking For Bill Payment..";
				showAlert('error');
				
			}
			else{
			$resource($scope.API_BASE_URL + //
			'/user/accounts').//
			save(function success(wrappedData) {
				if (wrappedData.status  && wrappedData.status == "ERROR") {
					$scope.showPayPopup = false;
					$rootScope.message = wrappedData.message;
					showAlert('error');
				} else {
					var data = wrappedData.value;
					$('#billDetailModal').modal('toggle');
					$scope.showPayPopup = true;
					$scope.accountNoAndBalance = data;
				}
			}, function error(data) {
				$rootScope.message = data.message;
				showAlert('error');
				$scope.showPayPopup = false;
			}
		);
		}
	};

		$scope.onBackClick = function() { $scope.showPayPopup = false;};
		
		$scope.onPayBillConfirmed = function(accountNumber, billNumber) {
			$('#indicator').show();
			var paybleBill = $scope.paybleBills[billNumber];
						
			$scope.showPayPopup = false;
			var paymentRequest = {};
			paymentRequest.billNo = paybleBill.BillNumber;
			paymentRequest.accountNo = accountNumber;
			$http.post($scope.API_BASE_URL + '/bill/payment', paymentRequest)
					.//
						success( function (data, status, headers, config) {

								$('#indicator').hide();

								if (data.status == "SUCCESS") {

									var paidBill = angular
											.fromJson(data.message);
									
									paybleBill = $scope.paybleBills[billNumber];
									
									paybleBill.PaymentStatus = paidBill.PaymentStatus;
									paybleBill.TransactionId = paidBill.TransactionId;
									$scope.fetchPaidBill();
									$scope.fetchUnpaidBill();
									$scope.selectedTab = "Paid";
									$scope.nowPaidTransIds.push(paidBill.TransactionId);
									$rootScope.message="The Bill has been successfully paid with Transaction Id: "+paidBill.TransactionId;
									showAlert('success');

								} else {

									$rootScope.message = data.message;

									if (data.errorCode == "409") {
										showAlert('error');
										$rootScope.navigator = false;
										$rootScope.authtoken = null;
										$scope.loadPage("/apin/verify");

									} else {
										$rootScope.message = data.message;
									}
									
									showAlert('error');
								}
								$('#indicator').hide();
			} )
			.error(function(data, status, headers, config) {

								$('#indicator').hide();
							});

		};

		// $scope.showBills = function() {
		//
		// if ($scope.billType == 'unpaid') {
		//
		// $scope.paybleBills = {};
		// $scope.scheduledBills = [];
		// $scope.fetchUnpaidBill();
		//
		// $scope.billType = 'paid';
		// } else {
		//
		// $scope.paidBills = [];
		// $scope.fetchPaidBill();
		//
		// $scope.billType = 'unpaid';
		// }
		// };

		// $scope.billType = 'paid';

		$scope.paybleBills = {};
		$scope.missedBills = [];
		$scope.fetchUnpaidBill();

		// $scope.scheduledBills = [];
		// $scope.fetchScheduledBill();

		$scope.paidBills = [];
		$scope.fetchPaidBill();
		$rootScope.navigator = false;
	}
	// $scope.fetchAllBills = function() {
	//
	// };
	else {
		$scope.loadPage("/apin/verify");

	}

}

function validate($scope) {

	
	//For Checking Length of the Password
	var newapinLen=($scope.data.newapin + '').length;
	var confirmapinLen=($scope.data.confirmapin + '').length;
	
	if(newapinLen == 6 && confirmapinLen == 6){
		
	//For Checking Only Digit Condition
	var checkdigit = $scope.data.newapin.match(/^[0-9]+$/);
	if(checkdigit == null){
		
		$scope.$root.message = "Password Should Have Only Digits !";
		showAlert('error');
		return false;
	}
	
	//For Checking Same Contents Of Password
	var result = $scope.data.newapin == $scope.data.confirmapin;
	if (!result) {
		$scope.$root.message = "New Password and Confirm Password must be same";
		showAlert('error');
		return result;
	}
	
	return result;
}else{
	$scope.$root.message = "Password Length Must be 6 Digit !";
	showAlert('error');
	return false;
	
}
}
function showAlert(type) {

	$(".alert").attr('class', 'alert alert-' + type);
	$(".alert").show();
}
