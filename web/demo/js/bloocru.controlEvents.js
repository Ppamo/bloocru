
// - - - - - - - - - - - - - - - - -

function loadControl_Login_Access_OnClick(src)
{
	clearContainers();
	loadControl_Locating();
	return false;
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
}

function loadControl_Locating_OnLocated()
{
	clearContainers();
	loadControl_Located();
	return false;
}

function loadControl_Located_OnConfirm(src)
{
	clearContainers();
	loadControl_Tips();
	return false;
}

function loadControl_Tips_SelectorOnChange(src)
{
	var selected=src.options[src.selectedIndex];
	currentPlaceCode=selected.getAttribute('value');
	loadControl_Tips_loadTipsData(contentBody.firstChild.rows[2].cells[0].firstChild, currentPlaceCode);
}

function loadControl_Tips_UserOnClick(src)
{
	currentUserId = src.getAttribute('userid');
}

function loadControl_Tips_MessageOnClick(src)
{
	currentMessageId = src.getAttribute('msgid');
	clearContainers();
	loadControl_Tip();
	return false;
}

function loadControl_Tips_PlaceOnClick(src)
{
	currentPlaceId = src.getAttribute('lat') + ';' + src.getAttribute('lng') + ';' + src.getAttribute('zoom');
}

function loadControl_Tips_Write(src)
{
	return false;
}

function loadControl_Tip_ReturnOnClick(src)
{
	clearContainers();
	loadControl_Tips();
	return false;
}

function loadControl_Tip_ParticipantsOnClick(src)
{
	return false;
}

