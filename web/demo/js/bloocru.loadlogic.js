var contentBody;
var contentSidebar;
var currentPlaceCode='scl';
var userId=2;
var currentMessageId, currentUserId, currentPlaceId;
// the map, I'll only create it once in the app life cicle
var gmapcanvas = document.createElement('div');
gmapcanvas.setAttribute('id', 'gmapcanvas');
gmapcanvas.setAttribute('class', 'gmapcanvashidden');
var gmapEditControl;
var gmapEditMarker;

var gmapCurrentZoom = 10;
var mapOptions =
	{
		center: new google.maps.LatLng(-33.440574,-70.638056), // SCL
		zoom: gmapCurrentZoom,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
var gmap;

var tipsDataLines = new Array();
// SCL
tipsDataLines[0]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'mall plaza norte', 1234, 1, 'Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n');
tipsDataLines[1]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'plaza baquedano', 1234, 2, 'juntemonos aca para ir bellavista en la noche');
tipsDataLines[2]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'aeropuerto de santiago', 1234, 3, 'donde nos juntamos?');
tipsDataLines[3]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'plaza de armas santiago', 1234, 4, 'vamos de shopping al centro');
// LPE
tipsDataLines[4]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'plaza de acho', 1234, 5, 'hay corrida de toros ma&ntilde;ana');
tipsDataLines[5]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'plaza san martin', 1234, 6, 'damos una vuelta por la plaza');
tipsDataLines[6]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'country club lima hotel', 1234, 7, 'juntemonos en recepci&oacute;n');
// BAA
tipsDataLines[7]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'parque francia', 1234, 8, 'vamos a dar una vuelta al parque...');
tipsDataLines[8]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'librer&uacute;a liberarte', 1234, 9, 'juntemonos en el centro');
tipsDataLines[9]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'estaci&oacute;n retiro', 1234, 10, 'damos una vuelta por puerto madero?');
// SCL
tipsDataLines[10]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'nam congue', 1234, 11, 'ipsum et porttitor viverra');
tipsDataLines[11]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'pellentesque', 1234, 12, 'nunc risus mollis lectus');
tipsDataLines[12]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'dui congue accumsan', 1234, 13, 'et tristique diam lorem posuere turpis');
// LPE
tipsDataLines[13]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'tortor', 1234, 14, 'sed tempor nisi nec, aliquet quis massa');
tipsDataLines[14]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'nam vitae tortor', 1234, 15, 'hendrerit tempus laoreet vitae');
tipsDataLines[15]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'ut nibh ante', 1234, 16, 'phasellus accumsan convallis faucibus');
tipsDataLines[16]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'class aptent', 1234, 17, 'taciti sociosqu ad litora torquent per conubia nostra');
// BAA
tipsDataLines[17]=loadControl_Tips_loadTipsData_GenerateHTMLCode(1, 'Hugo', 0, 0, 0, 'per inceptos himenaeos', 1234, 18, 'Sed tristique erat at felis volutpat tempor');
tipsDataLines[18]=loadControl_Tips_loadTipsData_GenerateHTMLCode(2, 'Paco', 0, 0, 0, 'nulla lacus arcu', 1234, 19, 'congue eget ultricies sit amet, convallis ut nibh');
tipsDataLines[19]=loadControl_Tips_loadTipsData_GenerateHTMLCode(3, 'Luis', 0, 0, 0, 'posuere varius libero', 1234, 20, 'Nunc non urna odio, sed porttitor orci');


function loadControl_Login()
{
	var innerCode='<table class="loginControl">' + 
		'<tr><td>Ingrese su correo<br/>y contrase&ntilde;a:</td></tr>' +
		'<tr><td><input onfocus="loadControl_Login_InputOnFocus(this);" onblur="loadControl_Login_InputOnBlur(this);" type="text" value="correo"></input></br>' +
		'<input onfocus="loadControl_Login_InputOnFocus(this);" onblur="loadControl_Login_InputOnBlur(this);" type="password" value="1234"></input></td></tr>' +
		'<tr><td><input type="checkbox"></input> <span onclick="loadControl_Login_RemembermeOnClick(this);" class="Rememberme">Recordarme</span></td></tr>' +
		'<tr><td>&nbsp;</td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_Login_Access_OnClick(this);" >Acceder</span></td></tr>' +
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
		'<tr><td><span class="text">Estas en </span>' +
		'<select onChange="loadControl_Located_SelectorOnChange(this)">' +
		'<option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option>' +
		'<option zoom="10" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option>' +
		'<option zoom="9" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option>' +
		'</select></td></tr>' +
		'<tr><td ></td></tr>' +
		'<tr><td ><span class="link" onClick="loadControl_Located_OnConfirm(this)" >Confirmar</span></td></tr>' +
		'</table>';
	gmapcanvas.setAttribute('class', 'gmapcanvas');
	contentBody.innerHTML=innerCode;
	contentBody.firstChild.rows[1].cells[0].appendChild(gmapcanvas);
	gmapCurrentZoom = 10;
	gmap = new google.maps.Map(gmapcanvas, mapOptions);
}

function loadControl_Tips()
{
	gmapcanvas.setAttribute('class', 'gmapcanvashidden');
	var innerCode='<table class="tipsControl">' +
		'<tr><td><span class="text">Estas en </span>' +
		'<select onChange="loadControl_Tips_SelectorOnChange(this)">' +
		'<option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option>' +
		'<option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option>' +
		'<option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option>' +
		'</select></td></tr>' +
		'<tr><td><div class="tipsContainer"><table></table></div></td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_Tips_Write(this);">Escribe</span></td></tr>' +
		'</table>';
	contentBody.innerHTML=innerCode;
	placeSelectorChanger(contentBody.firstChild.rows[0].cells[0].childNodes[1], currentPlaceCode);
	loadControl_Tips_loadTipsData(contentBody.firstChild.rows[1].cells[0].firstChild, currentPlaceCode);
}

function loadControl_Tip()
{
	var innerCode='<table class="tipControl">' +
		'<tr><td colspan="2"><div class="tipContainer"></div></td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_Tip_ReturnOnClick(this);">Volver</span></td>' +
		'<td><span class="link" onclick="loadControl_Tip_ParticipantsOnClick(this)" ;>Asistentes</span></td></tr>' +
		'</table>';
	contentBody.innerHTML=innerCode;
	loadControl_Tips_loadTipData(contentBody.firstChild.rows[0].cells[0].firstChild, currentMessageId);
}

function loadControl_TipJoin()
{
	var innerCode='<table class="tipJoinControl">' +
		'<tr><td colspan="2"><div class="tipJoinContainer">' +
		'<table>' +
		'<tr><td class="icon" userId="1"><img src="img/profiles/006.jpg" /></td><td><span class="tipJoinUser">Luis McPato</span></td></tr>' +
		'<tr><td class="icon" userId="3"><img src="img/profiles/003.jpg" /></td><td><span class="tipJoinUser">Paco McPato</span></td></tr>' +
		'<tr><td class="icon" userId="1"><img src="img/profiles/004.jpg" /></td><td><span class="tipJoinUser">Luis McPato Segundo</span></td></tr>' +
		'<tr><td class="icon" userId="3"><img src="img/profiles/002.jpg" /></td><td><span class="tipJoinUser">Paco McPato Segundo</span></td></tr>' +
		'</table>' +
		'</div></td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_TipJoin_ReturnOnClick(this);">Volver</span>' +
		'</td><td><span class="link" onclick="loadControl_TipJoin_ConfirmOnClick(this)" joined="false" ;>Participar</span></td></tr>' +
		'</table>';
	contentBody.innerHTML=innerCode;
}

function loadControl_ProfileControl()
{
	var innerCode='<table class="ProfileControl">' +
		'<tr><td><div class="ProfileContainer">' +
		'<table>' +
		'<tr><td class="icon"><img src="img/profiles/006.jpg" /></td>' +
		'<td><span class="name">Hugo McPato</span><br/>' +
		'<span>Tripulante</span></br>' +
		'<span>31/10/1980<span></br><span>acepta engargos</span></td></tr>' +
		'<tr><td colspan="2">sobre mi...</td></tr>' +
		'<tr><td colspan="2"> Ut aliquet dui vel dolor convallis id fringilla nisl mollis. Praesent consectetur ipsum eget nulla congue eu hendrerit purus semper. Phasellus ornare molestie lectus, sit amet luctus est auctor malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sagittis felis laoreet nulla feugiat vulputate. Praesent id augue sed risus tincidunt congue sed ac ligula</td></tr>' +
		'</table>' +
		'</div></td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_Profile_ReturnOnClick(this);">Volver</span></td><td></tr>' +
		'</table>';
	contentBody.innerHTML=innerCode;
}

function loadControl_PlaceControl(placeName, placeMapData)
{
	var innerCode='<table class="PlaceControl">' +
		'<tr><td></td></tr>' +
		'<tr><td></td></tr>' +
		'<tr><td><span class="link" onClick="loadControl_PlaceControl_ReturnOnClick(this)">Volver</span></td></tr>' +
		'</table>';
	if (gmap == null)
	{
		gmap = new google.maps.Map(gmapcanvas, mapOptions);
	}
	gmapcanvas.setAttribute('class', 'gmapcanvas');
	contentBody.innerHTML=innerCode;
	contentBody.firstChild.rows[1].cells[0].appendChild(gmapcanvas);
}

function loadControl_PostControl()
{
	var innerCode='<table class="PostControl">' +
		'<tr><td colspan="2"></td></tr>' +
		'<tr><td colspan="2"></td></tr>' +
		'</table>';
	if (gmap == null)
	{
		gmap = new google.maps.Map(gmapcanvas, mapOptions);
	}
	gmapcanvas.setAttribute('class', 'gmapcanvas');
	contentBody.innerHTML=innerCode;
	contentBody.firstChild.rows[0].cells[0].appendChild(gmapcanvas);
	
	var editForm='<table class="editForm">' + 
		'<tr><td colspan="2"><input defaultText="t&iacute;tulo" onfocus="loadControl_PostControl_MapMarkerInput_OnFocus(this);" onblur="loadControl_PostControl_MapMarkerInput_OnBlur(this);" value="t&iacute;tulo" type="text" size="20" /></td></tr>' +
		'<tr><td colspan="2"><textarea defaultText="descripci&oacute;n" onfocus="loadControl_PostControl_MapMarkerInput_OnFocus(this);" onblur="loadControl_PostControl_MapMarkerInput_OnBlur(this);" cols="16" rows="5">descripci&oacute;n</textarea></td></tr>' +
		'<tr><td><span class="link" onclick="loadControl_PostControl_CancelOnClick();" >Cancelar</span></td><td><span class="link" onclick="loadControl_PostControl_SaveOnClick();" >Publicar</span></td></tr></table>';
	gmapEditControl = new google.maps.InfoWindow({ content: editForm  });
	gmapEditMarker = new google.maps.Marker
		({
			position: gmap.getCenter(),
			map: gmap,
			title: 'Click to edit'
		});
	
	google.maps.event.addListener(gmap, 'click', function(e)
		{
			gmapEditMarker.setPosition(e.latLng);
		}
	);
	
	google.maps.event.addListener(gmapEditMarker, 'click', function()
		{
			gmapEditControl.open(gmap, gmapEditMarker);
		}
	);
}




 