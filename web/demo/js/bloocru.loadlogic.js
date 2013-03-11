// the map, I'll only create it once in the app life cicle
var gmapcanvas = document.createElement('div');
gmapcanvas.setAttribute('id', 'gmapcanvas');
gmapcanvas.setAttribute('class', 'gmapcanvas');
var gmapCurrentZoom = 10;
var mapOptions =
	{
		center: new google.maps.LatLng(-33.440574,-70.638056), // SCL
		zoom: gmapCurrentZoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var gmap;


function clearContainers()
{
	document.getElementById('contentBody').innerHTML='';
	document.getElementById('contentSidebar').innerHTML='';
}

/* 
	the pages to be loaded are:
		- login
		- locating
		- confirm locate
		
*/

function loadControl_Login()
{
	var innerCode='<table class="loginControl">' + 
		'<tr><td>Ingrese su correo y contrase&ntilde;a:</td></tr>' +
		'<tr><td><input type="text" value="correo"></input></br>' +
		'<input type="password" value="password"></input></td></tr>' +
		'<tr><td><a href="#" onclick="loadControl_Login_AccessOnClick(this);" >A Viajar!</a></td></tr>' +
		'<tr><td>&nbsp;</td></tr>' +
		'<tr><td><input type="checkbox"></input> Recordarme</td></tr>' +
		'</table>';
	
	document.getElementById('contentBody').innerHTML=innerCode;
}

function loadControl_Locating()
{
	var innerCode='<table class="locatingControl">' + 
		'<tr><td>Bienvenido</td></tr>' +
		'<tr><td><span id="name">Hugo</span>, te</td></tr>' +
		'<tr><td>estamos</td></tr>' +
		'<tr><td>localizando</td></tr>' +
		'<tr><td><img src="img/progresiveBar.png"/></td></tr>' +
		'</table>';
	
	document.getElementById('contentBody').innerHTML=innerCode;
	// here I should set a timeout to jump into the next screen
	setTimeout('loadControl_Locating_OnLocated();',5000);
}

function loadControl_Located()
{
	var innerCode='<table class="locatedControl">' +
		'<tr><td>Estas en:</td></tr>' +
		'<tr><td><select onChange="loadControl_Located_SelectorOnChange(this)">' +
		'<option lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option>' +
		'<option lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option>' +
		'<option lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option>' +
		'</select></td></tr>' +
		'<tr><td></td></tr>' +
		'<tr><td><a href="">Confirmar</a></td></tr>' +
		'</table>';
	document.getElementById('contentBody').innerHTML=innerCode;
	document.getElementById('contentBody').firstChild.rows[2].cells[0].appendChild(gmapcanvas);
	gmapCurrentZoom = 10;
	gmap = new google.maps.Map(gmapcanvas, mapOptions);
}


// - - - - - - - - - - - - - - - - -
function loadControl_Located_SelectorOnChange(src)
{
	var selected=src.options[src.selectedIndex];
	var lat=selected.getAttribute('lat');
	var lng=selected.getAttribute('lng');
	
	var latlng=new google.maps.LatLng(lat,lng);
	gmap.panTo(latlng);
	gmap.setCenter(latlng);
}
function loadControl_Locating_OnLocated()
{
	clearContainers();
	loadControl_Located();
	return false;
}
function loadControl_Login_AccessOnClick(src)
{
	clearContainers();
	loadControl_Locating();
	return false;
}


