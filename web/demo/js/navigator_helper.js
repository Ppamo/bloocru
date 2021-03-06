
function NavigatorHelper(navigator)
{
	this.execute = function (src, eventName)
		{
			var defaultReturnValue = false;
			var nodeName = src.getAttribute('oname');
			// alert('exec: ' + this.navigator.area + ' - ' + nodeName + '\n\r Object' + src.outerHTML);
			
			// Some executions are no related with the area
			switch (nodeName)
			{
				case 'menu.people':
					this.navigator.navigate('page', 'people');
					return defaultReturnValue;
					break;
				case 'menu.activities':
					this.navigator.navigate('page', 'tips');
					return defaultReturnValue;
					break;
				case 'menu.events':
					this.navigator.navigate('page', 'events');
					return defaultReturnValue;
					break;
				case 'menu.profile':
					this.navigator.navigate('page', 'myprofile');
					return defaultReturnValue;
					break;
			}
			
			// executios by area
			switch (this.navigator.area)
			{
				case 'init':
					switch (nodeName)
					{
						case 'login.access':
							this.navigator.navigate('page', 'locating');
							return defaultReturnValue;
							break;
						case 'locating.locating':
							this.navigator.navigate('page', 'located');
							return defaultReturnValue;
							break;
						case 'located.confirm':
							this.navigator.navigate('page', 'myprofile');
							return defaultReturnValue;
							break;
					}
					break;
				case 'activities': // action
					switch (nodeName)
					{
						case 'tips.user':
							this.navigator.userId = src.getAttribute('userid');
							this.navigator.navigate('page', 'profile');
							return defaultReturnValue;
							break;
						case 'tips.message':
							this.navigator.tipsMessageId = src.getAttribute('msgid');
							this.navigator.navigate('page', 'tip');
							return defaultReturnValue;
							break;
						case 'tip.back':
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'tipJoin.back':
							this.navigator.navigate('page', 'tip');
							return defaultReturnValue;
							break;
						case 'tip.participants':
							this.navigator.navigate('page', 'tipJoin');
							return defaultReturnValue;
							break;
						case 'profile.return':
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'place.return':
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'tip.join':
							var profilesTable = src.parentNode.parentNode.parentNode.rows[0].cells[0].firstChild.firstChild;
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
							return defaultReturnValue;
							break;
						case 'tips.write':
							this.navigator.navigate('page', 'postTip');
							return defaultReturnValue;
							break;
						case 'post.titleinput':
							switch (eventName)
							{
								case 'focus':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value==defaultText)
									{
										value='';
										src.style.color='black';
									}
									src.value = value;
									return defaultReturnValue;
									break;
								case 'blur':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value.length==0)
									{
										value=defaultText;
										src.style.color='';
									}
									src.value=value;
									return defaultReturnValue;
									break;
							}
							break;
						case 'post.descriptioninput':
							switch (eventName)
							{
								case 'focus':
									defaultText=src.getAttribute("defaulttext");
									var value = src.value;
									if (value==defaultText)
									{
										value='';
										src.style.color='black';
									}
									src.value = value;
									return defaultReturnValue;
									break;
								case 'blur':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value.length==0)
									{
										value=defaultText;
										src.style.color='';
									}
									src.value=value;
									return defaultReturnValue;
									break;
							}
							break;
						case 'post.cancel':
							gmapEditControl.close();
							setTimeout("worker.navigator.navigate('page', 'tips');", 500);
							return defaultReturnValue;
							break;
						case 'post.save':
							gmapEditControl.close();
							setTimeout("worker.navigator.navigate('page', 'tips');", 500);
							return defaultReturnValue;
							break;
						case 'postTip.cancel':
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'postTip.post':
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'postTip.title':
							switch (eventName)
							{
								case 'focus':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value==defaultText)
									{
										value='';
										src.style.color='black';
									}
									src.value = value;
									return defaultReturnValue;
									break;
								case 'blur':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value.length==0)
									{
										value=defaultText;
										src.style.color='';
									}
									src.value=value;
									return defaultReturnValue;
									break;
							}
							break;
						case 'postTip.description':
							switch (eventName)
							{
								case 'focus':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value==defaultText)
									{
										value='';
										src.style.color='black';
									}
									src.value = value;
									return defaultReturnValue;
									break;
								case 'blur':
									defaultText=src.getAttribute("defaulttext");
									var value=src.value;
									if (value.length==0)
									{
										value=defaultText;
										src.style.color='';
									}
									src.value=value;
									return defaultReturnValue;
									break;
							}
							break;
					}
					break;
				case 'people': // people
					switch(nodeName)
					{
						case 'profile.return':
							this.navigator.area = 'init';
							this.navigator.navigate('page', 'people');
							return defaultReturnValue;
							break;
						case 'people.avatar':
							this.navigator.area = 'people';
							this.navigator.navigate('page', 'profile');
							return defaultReturnValue;
							break;
					}
					break;
				case 'events': // action
					switch(nodeName)
					{
						case 'events.eventrow':
							switch (eventName)
							{
								case 'mouseover':
									src.style.backgroundColor='#EDE';
									return defaultReturnValue;
									break;
								case 'mouseout':
									src.style.backgroundColor='#FFF';
									return defaultReturnValue;
									break;
							}
							break;
						case 'event.user':
							this.navigator.navigate('page', 'profile');
							return defaultReturnValue;
							break;
						case 'event.place':
							this.navigator.navigate('page', 'place');
							return defaultReturnValue;
							break;
						case 'event.message':
							this.navigator.navigate('page', 'event');
							return defaultReturnValue;
							break;
						case 'events.selector':
							switch (eventName)
							{
								case 'change':
									var selected=src.options[src.selectedIndex];
									this.navigator.placeCode = selected.getAttribute('value');
									this.navigator.navigate('page', 'events');
									return defaultReturnValue;
									break;
							}
							break;
						case 'profile.return':
							this.navigator.navigate('page', 'events');
							return defaultReturnValue;
							break;
						case 'place.return':
							this.navigator.navigate('page', 'events');
							return defaultReturnValue;
							break;
					}
					break;
				case 'map': // map
					break;
			}
		};
		
// Constructor
	this.navigator = navigator;
}


function NavigatorScreenHelper(navigator)
{
// Methods
	this.execute = function (src, eventName)
		{
			var defaultReturnValue = false;
			var nodeName = src.getAttribute('oname');
			switch (nodeName)
			{
				case 'login.rememberLabel':
					var check=src.parentNode.firstChild;
					check.click();
					return defaultReturnValue;
					break;
				case 'login.loginInput':
					switch (eventName)
					{
						case 'focus':
							if (src.value=='correo')
							{
								src.value='';
								src.style.color='black';
							}
							return defaultReturnValue;
							break;
						case 'blur':
							if (src.value.length==0)
							{
								src.style.color='';
								src.value='correo';
							}
							return defaultReturnValue;
							break;
					}
					break;
				case 'login.passwordInput':
					switch (eventName)
					{
						case 'focus':
							if (src.value=='1234')
							{
								src.value='';
								src.style.color='black';
							}
							return defaultReturnValue;
							break;
						case 'blur':
							if (src.value.length==0)
							{
								src.style.color='';
								src.value='1234';
							}
							return defaultReturnValue;
							break;
					}
					break;
				case 'located.selector':
					switch (eventName)
					{
						case 'change':
							var selected=src.options[src.selectedIndex];
							this.navigator.placeCode = selected.getAttribute('value');
							var lat=selected.getAttribute('lat');
							var lng=selected.getAttribute('lng');
							var zoom=parseInt(selected.getAttribute('zoom'));
							worker.mapper.setPosition(lat, lng, zoom);
							return defaultReturnValue;
							break;
					}
					break;
				case 'tips.tiprow':
					switch (eventName)
					{
						case 'mouseover':
							src.style.backgroundColor='#EDE';
							return defaultReturnValue;
							break;
						case 'mouseout':
							src.style.backgroundColor='#FFF';
							return defaultReturnValue;
							break;
					}
					break;
				case 'tips.selector':
					switch (eventName)
					{
						case 'change':
							var selected=src.options[src.selectedIndex];
							this.navigator.placeCode = selected.getAttribute('value');
							this.navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
					}
					break;
			}
			return null;
		}
// Constructor
	this.navigator = navigator;
}



function BloocruHelper(navigator)
{
// Methods
	this.setLocationSelector = function(selector)
		{
			for (var i=0; i<selector.length; i++)
			{
				if (selector.options[i].value == this.navigator.placeCode)
				{
					selector.selectedIndex=i;
					return true;
				}
			}
			return true;
		}
		
	this.getTipsControlFromData = function(data)
		{
			var code = '<table>';
			var node;
			for (var i=0; i<data.length; i++)
			{
				node = this.getTipControlFromData(data[i]);
				code = code + '<tr><td oname="tips.tiprow" onmouseover="return worker.execute(this, \'mouseover\');" onmouseout="return worker.execute(this, \'mouseout\');">' +
					node + '</td></tr>';
			}
			code = code + '</table>';
			var div = document.createElement('div');
			div.innerHTML = code;
			return div.firstChild;
		}
	this.getTipControlFromData = function(data)
		{
			// Format: userId, userName, title, msgTime, msgId, msg 
			var node = '<span class="tip_user" userid="' + data[0] + '" onclick="return worker.execute(this);" oname="tips.user">' + data[1] +
				'</span> - <span class="tip_title">' + data[2] +
				'</span> <span class="tip_time" time="' + data[3] +
				'">hace un rato</span><br/><span class="tip_message" msgid="' + data[4] +
				'" onclick="return worker.execute(this);" oname="tips.message">' + data[5] + '</span>';
			return node;
		}
	this.getEventsControlFromData = function(data)
		{
			var code = '<table>';
			var node;
			for (var i=0; i<data.length; i++)
			{
				node = this.getEventControlFromData(data[i]);
				code = code + '<tr><td oname="events.eventrow" onmouseover="return worker.execute(this, \'mouseover\');" onmouseout="return worker.execute(this, \'mouseout\');">' +
					node + '</td></tr>';
			}
			code = code + '</table>';
			var div = document.createElement('div');
			div.innerHTML = code;
			return div.firstChild;
		}
	this.getEventControlFromData = function(data)
		{
			// Format: userId, userName, lat, lgn, zoom, placeName, msgTime, msgId, msg 
			var node = '<span class="event_user" userid="' + data[0] + '" onclick="return worker.execute(this);" oname="event.user">' + data[1] +
				'</span> en <span class="event_place" lat="' + data[2] + '" lng="' + data[3] + '" zoom="' + data[4] +
				'" onclick="return worker.execute(this);" oname="event.place">' + data[5] +
				'</span> <span class="event_time" time="' + data[6] +
				'">hace un rato</span><br/><span class="event_message" msgid="' + data[7] +
				'" onclick="return worker.execute(this);" oname="event.message">' + data[8] + '</span>';
			return node;
		}
	this.createMenu = function()
		{
			// worker.initNode
			var node = document.getElementById('base').lastChild.previousSibling;
			var div = document.createElement('div');
			div.innerHTML = '<table class="menuControl"><tr><td><span onclick="return worker.execute(this);" oname="menu.profile">perfil</span></td><td><span onclick="return worker.execute(this);" oname="menu.activities">avisos</span></td><td><span onclick="return worker.execute(this);" oname="menu.events">explora</span></td><td><span onclick="return worker.execute(this);" oname="menu.people">personas</span></td></tr></table>';
			node.appendChild(div.firstChild);
		}
// Constructor
	this.navigator = navigator;
	
}

