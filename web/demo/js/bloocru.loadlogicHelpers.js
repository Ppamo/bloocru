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
	var innerCode = "<table>";
	switch (placeCode)
	{
		case 'scl':
				// Hugo en copacabana palace hace 1 hora.   Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n
				innerCode = innerCode +
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[0] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[1] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[2] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[3] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[10] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[11] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[12] + '</td></tr>';
			break;
		case 'lpe':
				innerCode = innerCode +
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[4] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[5] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[6] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[13] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[14] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[15] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[16] + '</td></tr>';
			break;
		case 'baa':
				innerCode = innerCode +
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[7] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[8] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[9] + '</td></tr>' +
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[17] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[18] + '</td></tr>' + 
					'<tr><td onmouseover="loadControl_Tips_Message_OnMouseOver(this)" onmouseout="loadControl_Tips_Message_OnMouseOut(this)">' + tipsDataLines[19] + '</td></tr>';
			break;
	}
	innerCode = innerCode + '</table>';
	
	control.innerHTML = innerCode;
}

function loadControl_Tips_loadTipData(control, messageId)
{
	var innerCode='<table><tr><th>' + tipsDataLines[messageId-1] + '</th></tr>' +
		loadControl_Tips_loadTipDataByMessage(messageId) +
		'</table>';
	control.innerHTML = innerCode;
}

function loadControl_Tips_loadTipDataByMessage(messageId)
{
	return '<tr><td><span class="tip_user">Paco</span> dice <span class="tip_message">me anoto!</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Hugo</span> dice <span class="tip_message">excelente...</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Amet Magna</span> dice <span class="tip_message">sed porttitor venenatis mi et dignissim</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Massa</span> dice <span class="tip_message">in interdum est quis purus dignissim mattis</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Lorem</span> dice <span class="tip_message">vivamus placerat, dui a feugiat facilisis, risus lectus hendrerit quam</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Velit</span> dice <span class="tip_message">mauris dictum fermentum diam ac egestas</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Amet Magna</span> dice <span class="tip_message">sed porttitor venenatis mi et dignissim</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Massa</span> dice <span class="tip_message">in interdum est quis purus dignissim mattis</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Lorem</span> dice <span class="tip_message">vivamus placerat, dui a feugiat facilisis, risus lectus hendrerit quam</span> <span class="tip_time">hace un rato</span></td></tr>' +
		'<tr><td><span class="tip_user">Ipsum</span> dice <span class="tip_message">proin vel lacus a elit porta porta consequat eu ipsum</span> <span class="tip_time">hace un rato</span></td></tr>';
}





