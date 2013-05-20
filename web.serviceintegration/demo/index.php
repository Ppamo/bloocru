<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="demo/css/bloocru.css" type="text/css"/> <!-- for your own stylesheet -->
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD431yHR4gW9A7j_j52XheqmmLRplomJsU&sensor=true"> </script>
		<script type="text/javascript" src="demo/js/css3-mediaqueries.js"></script> <!-- to call the 'brain' of our project -->
		
		<script type="text/javascript" src="JSonAdmin/lib/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="JSonAdmin/lib/Sha1.js"></script>
		<script type="text/javascript" src="JSonAdmin/lib/Ppamo.RESTFulClient.js"></script>
		<script type="text/javascript" src="JSonAdmin/BlooCruRulesHandler.js"></script>
		
		<script type="text/javascript" src="demo/js/styler.js"></script>
		<script type="text/javascript" src="demo/js/persistence.js"></script>
		<script type="text/javascript" src="demo/js/navigator_helper.js"></script>
		<script type="text/javascript" src="demo/js/navigator.js"></script>
		<script type="text/javascript" src="demo/js/worker.js"></script>
		
		<script type="text/javascript" src="demo/js/bloocru.js"></script> <!-- bloocru code -->
		<script type="text/javascript" src="demo/js/bloocru.util.js"></script> <!-- bloocru code -->
		<script type="text/javascript" src="demo/js/bloocru.loadlogicHelpers.js"></script> <!-- bloocru load llogic helpers -->
		<script type="text/javascript" src="demo/js/bloocru.loadlogic.js"></script> <!-- bloocru load llogic -->
		<script type="text/javascript" src="demo/js/bloocru.controlEvents.js"></script> <!-- bloocru load llogic events -->
		
		<script type="text/javascript" > <!-- test logic -->
			function appOnLoad()
			{
				initApp();
				loadControl_Login();
				// loadControl_Located();
				// loadControl_Tips();
				// loadControl_ProfileControl();
			}
		</script>
		
	</head>
	<body onLoad='appOnLoad();'>
		<div id='debugBox' style='color: white; position: absolute; width: 200px; left: 400px; top: 10px;'>
		</div>
		<div id='base'>
			<div class="container logo"><img src='demo/img/Logo Bloocru.png' /></div>
			<div class="container header"><div>Conectando tripulantes...</div></div>
			<div class="container content">
				<div id='contentBody' class="container body"></div>
				<div id='contentSidebar' class="container sidebar"></div>
			</div>
			<div class="container footer"><p>Blooocru 2013</p></div>
		</div>
	</body>
</html>
