
function updateDebug()
{
	var box = document.getElementById('debugBox');
	box.innerHTML = "<table><tr><td>" + RESTFulClient.logger.join("</td></tr><tr><td>") + "</td></tr></table>";
}

// - - - - - - - - - - - - - - - - -

function loadControl_Login_Access_OnClick(src)
{
	var opened = worker.provider.openSession();
	var box = document.getElementById('loginMessageBox');
	box.innerHTML = '';
	if (opened == null) // success
	{
		clearContainers();
		loadControl_Locating();
	}
	else
	{
		var box = document.getElementById('loginMessageBox');
		box.innerHTML = opened;
	}
	
	updateDebug();
}

function loadControl_Login_InputOnFocus(src)
{
	if (src.type=='text' && src.value=='correo')
	{
		src.value='';
		src.style.color='black';
	}
	if (src.type=='password' && src.value=='1234')
	{
		src.value='';
		src.style.color='black';
	}
	var box = document.getElementById('loginMessageBox');
	box.innerHTML = '';
	
	updateDebug();
}
function loadControl_Login_InputOnBlur(src)
{
	if (src.type=='password')
		worker.provider.password = src.value;
	else
		worker.provider.login = src.value;
	if (src.value.length==0)
	{
		src.style.color='';
		if (src.type=='password')
		{
			src.value='1234';
		}
		else
		{
			src.value='correo';
		}
	}
	var box = document.getElementById('loginMessageBox');
	box.innerHTML = '';
	
	updateDebug();
}
function loadControl_Login_RemembermeOnClick(src)
{
	var check=src.parentNode.firstChild;
	check.click();
	
	updateDebug();
}
function loadControl_Located_SelectorOnChange(src)
{
	var selected=src.options[src.selectedIndex];
	currentPlaceCode=selected.getAttribute('value');

	var lat=selected.getAttribute('lat');
	var lng=selected.getAttribute('lng');
	var zoom=parseInt(selected.getAttribute('zoom'));
	
	var latlng=new google.maps.LatLng(lat,lng);
	gmap.panTo(latlng);
	gmap.setCenter(latlng);
	gmap.setZoom(zoom);
	
	updateDebug();
}

function loadControl_Locating_OnLocated()
{
	clearContainers();
	loadControl_Located();
	
	updateDebug();
	return false;
}

function loadControl_Located_OnConfirm(src)
{
	clearContainers();
	loadControl_Tips();
	
	updateDebug();
	return false;
}

function loadControl_Tips_SelectorOnChange(src)
{
	var selected=src.options[src.selectedIndex];
	currentPlaceCode=selected.getAttribute('value');
	loadControl_Tips_loadTipsData(contentBody.firstChild.rows[1].cells[0].firstChild, currentPlaceCode);
	
	updateDebug();
}

function loadControl_Tips_UserOnClick(src)
{
	currentUserId = src.getAttribute('userid');
	clearContainers();
	loadControl_ProfileControl();
	loadControl_LoadProfileData(currentUserId);
	
	updateDebug();
	return false;
	
}
function loadControl_Tips_Message_OnMouseOver(src)
{
	src.style.backgroundColor='#EDE';
	
	updateDebug();
}

function loadControl_Tips_Message_OnMouseOut(src)
{
	src.style.backgroundColor='#FFF';
	
	updateDebug();
}

function loadControl_Tips_MessageOnClick(src)
{
	currentMessageId = src.getAttribute('msgid');
	clearContainers();
	loadControl_Tip();
	
	updateDebug();
	return false;
}

function loadControl_Tips_PlaceOnClick(src)
{
	placeMapData = src.getAttribute('lat') + ';' + src.getAttribute('lng') + ';' + src.getAttribute('zoom');
	var placeName = src.innerHTML;
	clearContainers();
	loadControl_PlaceControl(placeName, placeMapData);
	
	updateDebug();
}


function loadControl_Tips_Write(src)
{
	clearContainers();
	loadControl_PostControl();
	
	updateDebug();
	return false;
}

function loadControl_Tip_ReturnOnClick(src)
{
	clearContainers();
	loadControl_Tips();
	
	updateDebug();
	return false;
}

function loadControl_Tip_ParticipantsOnClick(src)
{
	clearContainers();
	loadControl_TipJoin();
	
	updateDebug();
	return false;
}

function loadControl_TipJoin_ReturnOnClick(src)
{
	clearContainers();
	loadControl_Tip();
	
	updateDebug();
	return false;
}

function loadControl_TipJoin_ConfirmOnClick(src)
{
	var profilesTable = contentBody.firstChild.rows[0].cells[0].firstChild.firstChild;
	var joined = src.getAttribute('joined');
	if (joined == 'true')
	{
		profilesTable.deleteRow(profilesTable.rows.length-1);
		src.setAttribute('joined', false);
		src.innerHTML='Participar';
	}
	else
	{
		profilesTable.insertRow(profilesTable.rows.length);
		profilesTable.rows[profilesTable.rows.length-1].innerHTML='<td class="icon" userId="2"><img src="img/profiles/005.jpg" /></td><td><span class="tipJoinUser">Hugo McPato</span></td>';
		src.setAttribute('joined', true);
		src.innerHTML='Retirarse';
	}
	
	updateDebug();
	return false;
}

function loadControl_Profile_ReturnOnClick(src)
{
	clearContainers();
	loadControl_Tips();
	
	updateDebug();
	return false;
}

function loadControl_PlaceControl_ReturnOnClick(src)
{
	clearContainers();
	loadControl_Tips();
	
	updateDebug();
	return false;
}

function loadControl_PostControl_CancelOnClick(e)
{
	gmapEditControl.close();
	if (!e)
	e = window.event;

	if (e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
	
	setTimeout("deleteMapMarker(gmapEditMarker);clearContainers();loadControl_Tips();", 500);
	
	updateDebug();
	return false;
}

function loadControl_PostControl_SaveOnClick(e)
{
	// Here I should save the data
	gmapEditControl.close();
	if (!e)
	e = window.event;

	if (e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
		
	setTimeout("deleteMapMarker(gmapEditMarker);clearContainers();loadControl_Tips();", 500);
	
	updateDebug();
	return false;
}


function loadControl_PostControl_MapMarkerInput_OnFocus(src)
{
	defaultText=src.getAttribute("defaulttext");
	value = src.value;
	if (value==defaultText)
	{
		value='';
		src.style.color='black';
	}
	src.value = value;
	
	updateDebug();
	return false;
}
function loadControl_PostControl_MapMarkerInput_OnBlur(src)
{
	defaultText=src.getAttribute("defaulttext");
	value=src.value;
	if (value.length==0)
	{
		value=defaultText;
		src.style.color='';
	}
	src.value=value;
	
	updateDebug();
	return false;
}