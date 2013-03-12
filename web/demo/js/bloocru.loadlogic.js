var contentBody;
var contentSidebar;
var currentPlaceCode='scl';
// the map, I'll only create it once in the app life cicle
var gmapcanvas = document.createElement('div');
gmapcanvas.setAttribute('id', 'gmapcanvas');
gmapcanvas.setAttribute('class', 'gmapcanvashidden');
var gmapCurrentZoom = 10;
var mapOptions =
	{
		center: new google.maps.LatLng(-33.440574,-70.638056), // SCL
		zoom: gmapCurrentZoom,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var gmap;


function initApp()
{
	contentBody = document.getElementById('contentBody');
	contentSidebar = document.getElementById('contentSidebar');
}
function clearContainers()
{
	contentBody.innerHTML='';
	contentSidebar.innerHTML='';
	gmapcanvas.setAttribute('class', 'gmapcanvashidden');
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
		'<tr><td><a href="#" onclick="loadControl_Login_Access_OnClick(this);" >A Viajar!</a></td></tr>' +
		'<tr><td>&nbsp;</td></tr>' +
		'<tr><td><input type="checkbox"></input> Recordarme</td></tr>' +
		'</table>';
	
	contentBody.innerHTML=innerCode;
}

function loadControl_Locating()
{
	var innerCode='<table class="locatingControl">' + 
		'<tr><td>Bienvenido</td></tr>' +
		'<tr><td><span id="name">Hugo</span>, te</td></tr>' +
		'<tr><td>estamos</td></tr>' +
		'<tr><td>localizando</td></tr>' +
		'<tr><td><img src="img/loading.gif"/></td></tr>' +
		'</table>';
	
	contentBody.innerHTML=innerCode;
	setTimeout('loadControl_Locating_OnLocated();', 3000);
}

function loadControl_Located()
{
	var innerCode='<table class="locatedControl">' +
		'<tr><td>Estas en:</td></tr>' +
		'<tr><td><select onChange="loadControl_Located_SelectorOnChange(this)">' +
		'<option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option>' +
		'<option zoom="10" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option>' +
		'<option zoom="9" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option>' +
		'</select></td></tr>' +
		'<tr><td></td></tr>' +
		'<tr><td><a href="#" onClick="loadControl_Located_OnConfirm(this)" >Confirmar</a></td></tr>' +
		'</table>';
	gmapcanvas.setAttribute('class', 'gmapcanvas');
	contentBody.innerHTML=innerCode;
	contentBody.firstChild.rows[2].cells[0].appendChild(gmapcanvas);
	gmapCurrentZoom = 10;
	gmap = new google.maps.Map(gmapcanvas, mapOptions);
}

function loadControl_Tips()
{
	gmapcanvas.setAttribute('class', 'gmapcanvashidden');
	var innerCode='<table class="tipsControl">' +
		'<tr><td>Estas en:</td></tr>' +
		'<tr><td><select onChange="loadControl_Tips_SelectorOnChange(this)">' +
		'<option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option>' +
		'<option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option>' +
		'<option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option>' +
		'</select></td></tr>' +
		'<tr><td><div class="tipsContainer"><table></table></div></td></tr>' +
		'<tr><td><a href="">Escribe</a></td></tr>' +
		'</table>';
	contentBody.innerHTML=innerCode;
	placeSelectorChanger( contentBody.firstChild.rows[1].cells[0].firstChild, currentPlaceCode);
	// here I should start the loading of the messages
	loadControl_Tips_loadTipsData(contentBody.firstChild.rows[2].cells[0].firstChild, currentPlaceCode);
	// contentBody.firstChild.rows[2].cells[0].firstChild.firstChild.innerHTML='test text';
}

// - - - - - - - - - - - - - - - - -
function placeSelectorChanger(selector, placeCode)
{
	for (var i=0; i<selector.length; i++)
	{
		if (selector.options[i].value == placeCode)
		{
			selector.selectedIndex=i;
			return true;
		}
	}
	return true;
}
function loadControl_Tips_loadTipsData_GenerateHTMLCode(userId, userName, lat, lgn, zoom, placeName, msgTime, msgId, msg)
{
	return '<span class="tip_user" userid="' + userId + '" onclick="loadControl_Tips_UserOnClick(this);">' + userName +
		'</span> en <span class="tip_place" lat="' + lat + '" lng="' + lgn + '" zoom="' + zoom +
		'" onclick="loadControl_Tips_PlaceOnClick(this);">' + placeName +
		'</span> <span class="tip_time" time="' + msgTime +
		'">hace un rato</span><br/><span class="tip_message" msgid="' + msgId + '" onclick="loadControl_Tips_MessageOnClick(this);">' + msg + '</span>';
}
function loadControl_Tips_loadTipsData(control, placeCode)
{
	var lines = new Array();
	// SCL
	lines[0]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'mall plaza norte', 1234, 1, 'Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n');
	lines[1]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'plaza baquedano', 1234, 2, 'juntemonos aca para ir bellavista en la noche');
	lines[2]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'aeropuerto de santiago', 1234, 3, 'donde nos juntamos?');
	lines[3]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'plaza de armas santiago', 1234, 4, 'vamos de shopping al centro');
	// LPE
	lines[4]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'plaza de acho', 1234, 5, 'hay corrida de toros ma&ntilde;ana');
	lines[5]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'plaza san martin', 1234, 6, 'damos una vuelta por la plaza');
	lines[6]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'country club lima hotel', 1234, 7, 'juntemonos en recepci&oacute;n');
	// BAA
	lines[7]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'parque francia', 1234, 8, 'vamos a dar una vuelta al parque...');
	lines[8]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'librer&uacute;a liberarte', 1234, 9, 'juntemonos en el centro');
	lines[9]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'estaci&oacute;n retiro', 1234, 10, 'damos una vuelta por puerto madero?');
	// SCL
	lines[10]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'nam congue', 1234, 11, 'ipsum et porttitor viverra');
	lines[11]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'pellentesque', 1234, 12, 'nunc risus mollis lectus');
	lines[12]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'dui congue accumsan', 1234, 13, 'et tristique diam lorem posuere turpis');
	// LPE
	lines[13]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'tortor', 1234, 14, 'sed tempor nisi nec, aliquet quis massa');
	lines[14]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'nam vitae tortor', 1234, 15, 'hendrerit tempus laoreet vitae');
	lines[15]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'ut nibh ante', 1234, 16, 'phasellus accumsan convallis faucibus');
	lines[16]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'class aptent', 1234, 17, 'taciti sociosqu ad litora torquent per conubia nostra');
	// BAA
	lines[17]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'per inceptos himenaeos', 1234, 18, 'Sed tristique erat at felis volutpat tempor');
	lines[18]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'nulla lacus arcu', 1234, 19, 'congue eget ultricies sit amet, convallis ut nibh');
	lines[19]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'posuere varius libero', 1234, 20, 'Nunc non urna odio, sed porttitor orci');

	var innerCode = "<table>";
	switch (placeCode)
	{
		case 'scl':
				// Hugo en copacabana palace hace 1 hora.   Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n
				innerCode = innerCode +
					'<tr><td>' + lines[0] + '</td></tr>' + 
					'<tr><td>' + lines[1] + '</td></tr>' + 
					'<tr><td>' + lines[2] + '</td></tr>' + 
					'<tr><td>' + lines[3] + '</td></tr>' + 
					'<tr><td>' + lines[10] + '</td></tr>' + 
					'<tr><td>' + lines[11] + '</td></tr>' + 
					'<tr><td>' + lines[12] + '</td></tr>';
			break;
		case 'lpe':
				innerCode = innerCode +
					'<tr><td>' + lines[4] + '</td></tr>' + 
					'<tr><td>' + lines[5] + '</td></tr>' + 
					'<tr><td>' + lines[6] + '</td></tr>' + 
					'<tr><td>' + lines[13] + '</td></tr>' + 
					'<tr><td>' + lines[14] + '</td></tr>' + 
					'<tr><td>' + lines[15] + '</td></tr>' + 
					'<tr><td>' + lines[16] + '</td></tr>';
			break;
		case 'baa':
				innerCode = innerCode +
					'<tr><td>' + lines[7] + '</td></tr>' + 
					'<tr><td>' + lines[8] + '</td></tr>' + 
					'<tr><td>' + lines[9] + '</td></tr>' +
					'<tr><td>' + lines[17] + '</td></tr>' + 
					'<tr><td>' + lines[18] + '</td></tr>' + 
					'<tr><td>' + lines[19] + '</td></tr>';
			break;
	}
	innerCode = innerCode + '</table>';
	
	control.innerHTML = innerCode;
}

