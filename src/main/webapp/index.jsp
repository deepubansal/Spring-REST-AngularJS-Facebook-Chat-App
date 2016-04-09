<!DOCTYPE html>
<html lang="en" ng-app="spicepadApp">
<head>
<title>Spice Pad</title>


<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

<!-- CSS -->
<link rel="stylesheet" href="app/lib/jquery/jquery-ui.css">
<link rel="stylesheet" href="app/lib/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="app/lib/angular/angular-ui.css">

<!--  JS -->

<script id="facebook-jssdk"
  src="https://connect.facebook.net/en_US/all.js"></script>


<script src="app/lib/jquery/jquery.js"></script>
<script src="app/lib/jquery/jquery-ui.js"></script>
<script src="app/lib/bootstrap/js/bootstrap.js"></script>
<script src="app/lib/bootstrap/js/bootstrap-alert.js"></script>
<script src="app/lib/bootstrap/js/bootstrap-min.js"></script>
<script src="app/lib/angular/angular.js"></script>
<script src="app/lib/angular/angular-route.js"></script>
<script src="app/lib/angular/angular-resource.js"></script>
<script src="app/lib/angular/angular-ui.js"></script>
<script src="app/lib/angular/angular-min.js"></script>
<script src="app/lib/angular/angular-res-min.js"></script>
<script src="app/lib/angular/angular-keep-values.min.js"></script>
<script src="app/lib/angular/scrollglue.js"></script>

<!-- App -->
<script src="app/scripts/app.js"></script>
<script src="app/scripts/apiservice.js"></script>


<link rel="stylesheet" href="app/css/reset.css" type="text/css">
<link rel="stylesheet" href="app/css/style.css" type="text/css">

</head>

<body id="page">
<script>

  

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<h1 id="fb-welcome"></h1>
<div ng-controller="BaseController" ng-init="init('${flightNo}','${date}')">
	<input type="hidden" ng-model="flightNo" value="" keep-current-value></input>
	<input type="hidden" ng-model="date" value="" keep-current-value></input>
</div>
  <div>
    <div ng-view></div>
  </div>
</body>


</html>