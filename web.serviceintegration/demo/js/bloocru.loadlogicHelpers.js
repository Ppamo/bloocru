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
	var events_ = worker.provider.loadEvents();
	var innerCode = "<table>";
	var tipData = '';
	
	for (var i = 0; i < events_.items.length; i++)
	{
		tipData = loadControl_Tips_loadTipsData_GenerateHTMLCode(events_.items[i].peopleId, events_.items[i].firstName + ' ' + events_.items[i].lastName, events_.items[i].latitude, events_.items[i].longitude, events_.items[i].zoom, events_.items[i].placeName, events_.items[i].timestamp, events_.items[i].eventId, events_.items[i].description);
		innerCode = innerCode + '<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipData + '</td></tr>';
	}
	innerCode = innerCode + '</table>';
	
	control.innerHTML = innerCode;
}

function loadControl_Tips_loadTipData(control, messageId)
{
	var event_ = worker.provider.getEvent(messageId);
	var innerCode='<table><tr><th>' + loadControl_Tips_loadTipsData_GenerateHTMLCode(event_.peopleId, event_.firstName + ' ' + event_.lastName, event_.latitude, event_.longitude, event_.zoom, event_.placeName, event_.timestamp, event_.eventId, event_.description) + '</th></tr>' +
		loadControl_Tips_loadTipDataByMessage(messageId) +
		'</table>';
	control.innerHTML = innerCode;
}

function loadControl_Tips_loadTipDataByMessage(messageId)
{
	var messages = worker.provider.loadConversationsByEventId(messageId);
	var code = '';
	if (messages != null)
	{
		var code = '';
		for (var i = 0; i < messages.items.length; i++)
		{
			code = code + '<tr><td><span class="tip_user">' + messages.items[i].firstName + ' ' + messages.items[i].lastName +
				'</span> dice <span class="tip_message">' + messages.items[i].text + '</span> <span class="tip_time">hace un rato</span></td></tr>';
		}
	}
	// add message
	code = code + '<tr><td><input eventId="' + messageId + '" onfocus="CommentBoxInputOnFocus(this);" onblur="CommentBoxInputOnBlur(this);" class="comment_input" type="text" value="comenta..." />' +
		'<span class="comment_save" onclick="CommentBoxOnSave(this);">guarda</span></td></tr>';
	return code;
}

function deleteMapMarker(marker)
{
	marker.setMap(null);
	marker = null;
}



