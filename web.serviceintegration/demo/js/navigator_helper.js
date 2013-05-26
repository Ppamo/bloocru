
function NavigatorHelper(__navigator)
{
	this.execute = function (src, eventName)
		{
			var defaultReturnValue = false;
			var nodeName = src.getAttribute('oname');
			// alert('exec: ' + this.__navigator.area + ' - ' + nodeName + '\n\r Object' + src.outerHTML);
			
			// Some executions are no related with the area
			switch (nodeName)
			{
				case 'menu.people':
					this.__navigator.navigate('page', 'people', src, eventName);
					return defaultReturnValue;
					break;
				case 'menu.activities':
					this.__navigator.navigate('page', 'tips', src, eventName);
					return defaultReturnValue;
					break;
				case 'menu.events':
					this.__navigator.navigate('page', 'events', src, eventName);
					return defaultReturnValue;
					break;
				case 'menu.profile':
					this.__navigator.navigate('page', 'myprofile', src, eventName);
					return defaultReturnValue;
					break;
			}
			
			// executios by area
			switch (this.__navigator.area)
			{
				case 'init':
					switch (nodeName)
					{
						case 'login.access':
							var loginInput = document.getElementById('login_LoginInput');
							var passInput = document.getElementById('login_PasswordInput');
							worker.__provider.login = (loginInput.value == 'correo') ? 'hugo' : loginInput.value ;
							worker.__provider.password = (passInput.value == '1234') ? 'pass.hugo' : passInput.value;
							if (worker.__provider.openSession())
								this.__navigator.navigate('page', 'locating', src, eventName);
							else
							{
								var lcolor = loginInput.style.color;
								var pcolor = passInput.style.color;
								$("#login_LoginInput").css({color: "#f00"}, 500 ).animate({color: lcolor}, 3000 );
								$("#login_PasswordInput").css({color: "#f00"}, 500 ).animate({color: pcolor}, 3000 );
							}
							return defaultReturnValue;
							break;
						case 'locating.locating':
							this.__navigator.navigate('page', 'located', src, eventName);
							return defaultReturnValue;
							break;
						case 'located.confirm':
							// here save the new location
							worker.__provider.storeLocalization();
							this.__navigator.navigate('page', 'myprofile', src, eventName);
							return defaultReturnValue;
							break;
					}
					break;
				case 'activities': // action
					switch (nodeName)
					{
						case 'tips.user':
							this.__navigator.navigate('page', 'profile', src, eventName);
							return defaultReturnValue;
							break;
						case 'tips.message':
							this.__navigator.navigate('page', 'tip', src, eventName);
							return defaultReturnValue;
							break;
						case 'tip.back':
							this.__navigator.navigate('back');
							return defaultReturnValue;
							break;
						case 'tipJoin.back':
							this.__navigator.navigate('page', 'tip', src, eventName);
							return defaultReturnValue;
							break;
						case 'tip.participants':
							this.__navigator.navigate('page', 'tipJoin', src, eventName);
							return defaultReturnValue;
							break;
						case 'profile.return':
							this.__navigator.navigate('back');
							// this.__navigator.navigate('page', 'tips');
							return defaultReturnValue;
							break;
						case 'place.return':
							this.__navigator.navigate('back');
							return defaultReturnValue;
							break;
						case 'tip.comment':
							var table = src.parentNode.parentNode.parentNode.parentNode;
							var description = worker.__navigatorhelper.getValueText(table.rows[table.rows.length-1].cells[0].firstChild);
							if (description == '')
								return false;

							var activity = worker.__provider.fromJSon(src.getAttribute('JSonCode'));
							worker.__provider.saveActivityComment(description, activity.id);
							this.__navigator.navigate('page', 'tip', src, eventName);
							return defaultReturnValue;
							break;
						case 'tips.write':
							var table = src.parentNode.parentNode.parentNode;
							var title = worker.__navigatorhelper.getValueText(table.rows[0].cells[0].firstChild);
							var description = worker.__navigatorhelper.getValueText(table.rows[1].cells[0].firstChild);
							
							if (title == '')
							{
								alert('debes ingresar un titulo');
								table.rows[0].cells[0].firstChild.focus();
								return false;
							}
							if (description == '')
							{
								alert('debes ingresar una descripcion');
								table.rows[1].cells[0].firstChild.focus();
								return false;
							}
							
							worker.__provider.saveActivity(title, description);
							this.__navigator.navigate('page', 'tips', src, eventName);
							
							return defaultReturnValue;
							break;
						case 'tips.title':
							switch (eventName)
							{
								case 'focus':
									worker.__navigatorhelper.handleOnFocusText(src, '#4926BC');
									return defaultReturnValue;
									break;
								case 'blur':
									worker.__navigatorhelper.handleOnBlurText(src);
									return defaultReturnValue;
									break;
							}
							break;
						case 'tips.description':
							switch (eventName)
							{
								case 'focus':
									worker.__navigatorhelper.handleOnFocusText(src, 'black');
									return defaultReturnValue;
									break;
								case 'blur':
									worker.__navigatorhelper.handleOnBlurText(src);
									return defaultReturnValue;
									break;
							}
							break;
						case 'post.cancel':
							gmapEditControl.close();
							setTimeout("worker.__navigator.navigate('page', 'tips');", 500);
							return defaultReturnValue;
							break;
						case 'post.save':
							gmapEditControl.close();
							setTimeout("worker.__navigator.navigate('page', 'tips');", 500);
							return defaultReturnValue;
							break;
						case 'postTip.cancel':
							this.__navigator.navigate('page', 'tips', src, eventName);
							return defaultReturnValue;
							break;
						case 'postTip.post':
							this.__navigator.navigate('page', 'tips', src, eventName);
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
							this.__navigator.area = 'init';
							this.__navigator.navigate('page', 'people', src, eventName);
							return defaultReturnValue;
							break;
						case 'people.avatar':
							this.__navigator.area = 'people';
							this.__navigator.navigate('page', 'profile', src, eventName);
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
							this.__navigator.navigate('page', 'profile', src, eventName);
							return defaultReturnValue;
							break;
						case 'event.place':
							this.__navigator.navigate('page', 'event', src, eventName);
							return defaultReturnValue;
							break;
						case 'event.message':
							this.__navigator.navigate('page', 'eventmessage', src, eventName);
							return defaultReturnValue;
							break;
						case 'events.selector':
							switch (eventName)
							{
								case 'change':
									var selected=src.options[src.selectedIndex];
									this.__navigator.placeCode = selected.getAttribute('value');
									this.__navigator.navigate('page', 'events', src, eventName);
									return defaultReturnValue;
									break;
							}
							break;
						case 'profile.return':
							this.__navigator.navigate('back');
							return defaultReturnValue;
							break;
						case 'place.return':
							this.__navigator.navigate('back');
							return defaultReturnValue;
							break;
						case 'place.add':
							var code = '<table style="padding: 0px; margin: 0px;" class="editForm">' + 
								'<tr><td><input oname="eventmap.title" defaulttext="nombre" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\')" value="nombre" type="text" size="20"></td></tr>' + 
								'<tr><td><textarea defaulttext="descripcion" oname="eventmap.description" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\')" cols="16" rows="5">descripcion</textarea></td></tr>' + 
								'<tr><td><span class="eventMapCancel" oname="eventmap.cancel" onclick="return worker.execute(this);" >Cancelar</span><span class="eventMapPost" oname="eventmap.post" onclick="return worker.execute(this);" >Publicar</span></td></tr>' + 
								'</table>';

							GmapHelper.AddClickMark('haz click en el mapa para ubicar el pin, luego haz click en el pin para agregar los datos', code);
							return defaultReturnValue;
							break;
						case 'eventmap.cancel':
							GmapHelper.RemoveClickMark();
							return defaultReturnValue;
							break;
						case 'eventmap.post':
							// get the values
							var table = src.parentNode.parentNode.parentNode;
							var title = worker.__navigatorhelper.getValueText(table.rows[0].cells[0].firstChild);
							var description = worker.__navigatorhelper.getValueText(table.rows[1].cells[0].firstChild);
							var position = GmapHelper.addMark.getPosition();
							var zoom = GmapHelper.gmap.getZoom()
							// title, description, latitude, longitude, zoom
							worker.__provider.saveEvent(title, description, position.lat(), position.lng(), zoom);
							if (worker.__provider.eventsCache == null) worker.__provider.loadEvents();
							worker.__provider.eventsCache = null;
							GmapHelper.RemoveClickMark();
							GmapHelper.createMark(position.lat(), position.lng(), zoom, title);
							return defaultReturnValue;
							break;
						case 'eventmap.title':
						case 'eventmap.description':
						case 'eventmessage.commenttext':
							switch (eventName)
							{
								case 'focus':
									worker.__navigatorhelper.handleOnFocusText(src, 'black');
									return defaultReturnValue;
									break;
								case 'blur':
									worker.__navigatorhelper.handleOnBlurText(src);
									return defaultReturnValue;
									break;
							}
							break;
						case 'eventmessage.comment':
							// store the comment
							var table = src.parentNode.parentNode.parentNode.parentNode;
							var text = worker.__navigatorhelper.getValueText(table.rows[table.rows.length - 1].cells[0].firstChild);
							if (text == '')
								return false;
							
							var node = worker.__provider.fromJSon(src.getAttribute('JSonCode'));
							worker.__provider.saveEventComment(text, node.id);
							this.__navigator.navigate('page', 'eventmessage', src, eventName);
							return defaultReturnValue;
							
							return defaultReturnValue;
							break;
						case 'eventmessage.return':
							this.__navigator.navigate('page', 'events', src, eventName);
							return defaultReturnValue;
							break;
						case 'event.loadmap':
							this.__navigator.navigate('page', 'eventsmap', src, eventName);
							return defaultReturnValue;
							break;
					}
					break;
				case 'map': // map
					break;
			}
		};
		
// Constructor
	this.__navigator = __navigator;
}


function NavigatorScreenHelper(__navigator)
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
							var id = selected.getAttribute('value');
							var lat=selected.getAttribute('lat');
							var lng=selected.getAttribute('lng');
							var zoom=parseInt(selected.getAttribute('zoom'));
							this.__navigator.placeCode = id;
							worker.__provider.setCityById(id);
							GmapHelper.setPosition(lat, lng, zoom);
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
							var id = selected.getAttribute('value');
							worker.__provider.setCityById(id);
							this.__navigator.navigate('page', 'tips', src, eventName);
							return defaultReturnValue;
							break;
					}
					break;
			}
			return null;
		}
		
		
// Constructor
	this.__navigator = __navigator;
}



function BloocruHelper(__navigator)
{
// Methods
	this.setLocationSelector = function(selector)
		{
			for (var i=0; i<selector.length; i++)
			{
				if (selector.options[i].value == this.__navigator.placeCode)
				{
					selector.selectedIndex=i;
					return true;
				}
			}
			return true;
		}
		
	this.getTipsControlFromData = function(data)
		{
			var table = document.createElement('table');
			var div = document.createElement('div');			
			var row, cell;
			for (var i=0; i < data.length; i++)
			{
				row = table.insertRow(table.rows.length);
				div.innerHTML = '<table><tr><td oname="tips.tiprow" activityIndex="' + i + '" activityId="' + data[i].activityId + '" onmouseover="return worker.execute(this, \'mouseover\');" onmouseout="return worker.execute(this, \'mouseout\');">' + this.getTipControlFromData(data[i]) + '</td></tr></table>';
				row.appendChild(div.firstChild.rows[0].cells[0]);
			}
			return table;
		}
	this.getTipControlFromData = function(data)
		{
			var node = '<span class="tip_user" peopleId="' + data.peopleId + '" onclick="return worker.execute(this);" oname="tips.user">' +
				data.firstName + ' ' + data.lastName + '</span> - <span class="tip_title">' + data.title +
				'</span> <span class="tip_time" time="' + data.timestamp +
				'">hace un rato</span><br/><span class="tip_message" activityId="' + data.activityId + '" ' + 
				"onclick=\"return worker.execute(this);\" JSonCode='" + worker.__provider.toJSon(data) + "' oname=\"tips.message\">" + data.description + '</span>';
			
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
	// LoadCitiesSelector
	this.LoadCitiesSelector = function(selector, cities)
		{
			var options = null;
			for (var i = 0; i < cities.items.length; i++)
			{
				option = document.createElement('option');
				selector.appendChild(option);
				option.text = cities.items[i].name.charAt(0).toUpperCase() + cities.items[i].name.slice(1);
				option.value = cities.items[i].id;
				option.setAttribute('lat', cities.items[i].latitude);
				option.setAttribute('lng', cities.items[i].longitude);
				option.setAttribute('zoom', cities.items[i].zoom);
				if (worker.__provider.currentCity.id == cities.items[i].id)
					option.selected = true;
			}
		}
	// handleOnFocusText
	this.handleOnFocusText = function(src, newColor)
		{
			if (typeof(newColor) == "undefined") newColor = 'black';
			var defaultText = (src.getAttribute("defaulttext") != null) ? src.getAttribute("defaulttext") : '' ;
			var value=src.value;
			if (value==defaultText)
			{
				value='';
				src.style.color=newColor;
			}
			src.value = value;
		}
	// handleOnBlurText
	this.handleOnBlurText = function(src, newColor)
		{
			var defaultText = (src.getAttribute("defaulttext") != null) ? src.getAttribute("defaulttext") : '' ;
			var value=src.value;
			if (value.length==0)
			{
				value=defaultText;
				src.style.color='';
			}
			src.value=value;
		}
	this.getValueText = function (src)
		{
			var value = src.value;
			var defaultText = (src.getAttribute("defaulttext") != null) ? src.getAttribute("defaulttext") : '' ;
			if (value == defaultText)
				return '';
			return value;
		}
// Constructor
	this.__navigator = __navigator;
	
}

