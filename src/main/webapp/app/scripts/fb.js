function doFacebookAuthorize(afterAuth, $http, $scope, $rootScope) {

	FB.init({
	      appId      : '1577073059253708',
	      xfbml      : true,
	      version    : 'v2.5'
	});

	var afterLogin = function(response) {
		if (response.status === 'connected') {	
			var userRequest = {};
			$rootScope.authResponse = FB.getAuthResponse();
			FB.api('/me', function(response) {
				afterAuth(response);
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	};

	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			afterLogin(response);
		} else {
			FB.login(afterLogin, {scope: 'publish_actions'});
		}
	});
}