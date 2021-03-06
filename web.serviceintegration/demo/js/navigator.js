
function _Navigator()
{

	// Attributes
	this.__initNode = null;
	this.areaCodes = new Array();
	this.areaCodes.push('init');
	this.areaCodes.push('profile');
	this.areaCodes.push('activities');
	this.areaCodes.push('events');
	this.areaCodes.push('people');
	this.area = this.areaCodes[0];
	this.holder = document.createElement('div');
	this.pageCodes = new Array();
	this.pageOnLoadLogic = new Array();
	// Constants
	// Page Code
	this.pageCodes.push(new Array('login', '<table class="loginControl"><tr><td>Ingrese su correo<br/>y contrase&ntilde;a:</td></tr><tr><td><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.loginInput" type="text" value="correo" id="login_LoginInput"></input></br><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.passwordInput" type="password" value="1234" id="login_PasswordInput"></input></td></tr><tr><td><input type="checkbox"></input> <span onclick="return worker.execute(this);" oname="login.rememberLabel" class="Rememberme">Recordarme</span></td></tr><tr><td>&nbsp;</td></tr><tr><td><div class="link" onclick="return worker.execute(this);" oname="login.access"><span>Acceder</span></div></td></tr></table>',
		function()
		{	
			worker.__navigator.area = 'init';
			worker.__navigator.ignorePageStack = true;
		},
		null
		));
	this.pageCodes.push(new Array('locating', '<table oname=\'locating.locating\' class="locatingControl"><tr><td>Bienvenido</td></tr><tr><td><span id="name" style="text-transform:capitalize;"></span>, te</td></tr><tr><td>estamos</td></tr><tr><td>localizando</td></tr><tr><td><img src="demo/img/loading.gif"/></td></tr></table>', 
		function()
		{
			worker.initNode.firstChild.rows[1].cells[0].firstChild.innerHTML = worker.__provider.login.toLowerCase();
			worker.__provider.localize();
			GmapHelper.localize(function (position) { worker.__provider.setCoords(position); });
			worker.executeAsync(function(){ return worker.initNode.firstChild; }, 'timeout', 3000);
			// disable the page stack
			worker.__navigator.ignorePageStack = true;
		},
		null
		));
	this.pageCodes.push(new Array('located', '<table class="locatedControl"><tr><td><span class="text">Estas en </span><select oname="located.selector" onChange="return worker.execute(this, \'change\');"></select></td></tr><tr><td class="mapContainer"></td></tr><tr><td ><div class="link" oname="located.confirm" onClick="return worker.execute(this);" ><span>Confirmar</span></div></td></tr></table>',
		function()
		{
			var cities = worker.__provider.listCities();
			GmapHelper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
			GmapHelper.setPosition(worker.__provider.currentCity.latitude, worker.__provider.currentCity.longitude, worker.__provider.currentCity.zoom);
			worker.__navigatorhelper.LoadCitiesSelector(worker.initNode.firstChild.rows[0].cells[0].childNodes[1], cities);
			worker.__navigator.ignorePageStack = true;
		},
		null
		));
	this.pageCodes.push(new Array('myprofile', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="demo/img/profiles/001.jpg" /></td><td><table><tr><td class="name"></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></td></tr><tr><td colspan="2" class="description"></td></tr></table></div><tr><td><div class="editButton" oname="myprofile.edit" onclick="return worker.execute(this);"><span>Editar</span></div></td></tr></td></tr></table>',
		function(src, eventName)
		{
			worker.__navigator.area = 'profile';
			worker.__navigator.bloocruhelper.createMenu();
			
			var profile = worker.__provider.getUserProfile();
			var table = worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild;
			var dataTable = table.rows[0].cells[1].firstChild;
			dataTable.rows[0].cells[0].innerHTML = profile.firstName.toLowerCase() + ' ' + profile.lastName.toLowerCase();
			dataTable.rows[1].cells[0].innerHTML = profile.roleName.toUpperCase();
			dataTable.rows[2].cells[0].innerHTML = profile.birthDate.substring(0, 10);
			table.rows[1].cells[0].innerHTML = profile.description;	
		},
		null
		));
	this.pageCodes.push(new Array('editprofile', '<table class="ProfileEditControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="demo/img/profiles/001.jpg" /></td><td><table><tr><td class="firstName"><input type="text" /></td><td class="lastName"><input type="text" /></td></tr><tr><td colspan="2"><select class="roleSelector" oname="role.selector"></select></td></tr><tr><td colspan="2"><input class="dateInput" size="10" maxlength="10" type="text" /></td></tr><tr><td colspan="2"></td></tr></table></td></tr><tr><td class="description" colspan="2" ><textarea ></textarea></td></tr></table></div></td></tr><tr><td><span class="errorMessage">&nbsp;</span></td></tr><tr><td><span class="saveButton" oname="myprofile.save" onclick="return worker.execute(this);">Guardar</span><span class="cancelButton" oname="myprofile.cancel" onclick="return worker.execute(this);">Cancelar</span></td></tr></table>',
		function(src, eventName)
		{		
			worker.__navigator.bloocruhelper.createMenu();
			
			var profile = worker.__provider.getUserProfile();
			var table = worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild;
			var innerTable = table.rows[0].cells[1].firstChild;
			var selector = innerTable.rows[1].cells[0].firstChild;
			var year = profile.birthDate.substring(0,4);
			var month = profile.birthDate.substring(5,7);
			var day = profile.birthDate.substring(8,10);
			
			innerTable.rows[0].cells[0].firstChild.value = profile.firstName;
			innerTable.rows[0].cells[1].firstChild.value = profile.lastName;
			table.rows[1].cells[0].firstChild.value = profile.description;
			innerTable.rows[2].cells[0].firstChild.value = day + '-' + month + '-' + year;
						
			var roles = worker.__provider.listRoles();
			if (roles != null)
			{
				var option;
				for (var i = 0; i < roles.items.length; i++)
				{
					option = document.createElement('option');
					selector.appendChild(option);
					option.text = roles.items[i].name;
					option.value = roles.items[i].id;
					if (profile.roleId == roles.items[i].id)
						option.selected = true;
				}
			}
		},
		null
		));
	this.pageCodes.push(new Array('tips', '<table class="tipsControl"><tr><td><span class="text">Estas en </span><select oname="tips.selector" onChange="return worker.execute(this, \'change\');"></select></td></tr><tr><td><div class="tipsContainer"><table></table></div></td></tr></table>',
		function(src, eventName)
		{
			worker.__navigator.area = 'activities';
			worker.__navigator.bloocruhelper.createMenu();
			
			// add the write node...
			var div = document.createElement('div');
			div.innerHTML = '<table style="margin: 0px; padding: 0px; border: 0px;" id="tipsPostTable" class="tipsPostTable"><tr><td style="padding: 0px; border: 0px;" style="padding: 0px; border: 0px;" class="addtips_title"><input oname="tips.title" value="titulo" defaulttext="titulo" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" type="text" /></td><td style="padding: 0px; border: 0px;" class="addtips_link"><span oname="tips.write" onclick="return worker.execute(this);">publicar</span></td></tr><tr><td style="margin: 0px; padding: 0px; border: 0px;" class="addtips_description" colspan="2"><textarea defaulttext="ingresa el mensaje..." oname="tips.description" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" >ingresa el mensaje...</textarea></td></table>';
			worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(div.firstChild);
			
			// create the activities table
			var cities = worker.__provider.listCities();
			worker.__navigatorhelper.LoadCitiesSelector(worker.initNode.firstChild.rows[0].cells[0].childNodes[1], cities);
			var activities = worker.__provider.loadActivities();
			if (activities != null)
			{
				var node = worker.__navigator.bloocruhelper.getTipsControlFromData(activities.items);
				worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(node);
			}
			
		},
		null
		));
	this.pageCodes.push(new Array('tip', '<table class="tipControl"><tr><td colspan="2"><div class="tipContainer"></div></td></tr></table>',
		function(src, eventName)
		{
			worker.__navigator.bloocruhelper.createMenu();
			var activity = worker.__provider.fromJSon(src.getAttribute('JSonCode'));
			var innerCode = '';
			var messages = worker.__provider.loadConversationsByActivityId(activity.id);
			if (messages != null)
			{
				for (var i = 0; i < messages.items.length; i++)
				{
					innerCode = innerCode + '<tr><td><span class="tip_user">' + messages.items[i].firstName + ' ' + messages.items[i].lastName +
						'</span> dice <span class="tip_message">' + messages.items[i].text + '</span> <span class="tip_time">hace un rato</span></td></tr>';
				}
			}
			innerCode='<table><tr><th>' + worker.__navigatorhelper.getTipControlFromData(activity) + '</th></tr>' + innerCode + '</table>';
			worker.initNode.firstChild.rows[0].cells[0].firstChild.innerHTML = innerCode;
			
			// add the write node...
			var table = worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild;
			var cell = table.insertRow(table.rows.length).insertCell(0);
			cell.setAttribute('class', 'commentButtons');
			cell.setAttribute('style', 'padding: 0px; border: 0px;');
			cell.innerHTML = '<span oname="tip.join" class="join" activityId="' + activity.id + '" onclick="return worker.execute(this);" >participar</span><span class="comment" oname="tip.comment" JSonCode=\'' + src.getAttribute('JSonCode') + '\' onclick="return worker.execute(this);">comenta</span>';
			cell = table.insertRow(table.rows.length).insertCell(0);
			cell.setAttribute('class', 'commentText');
			cell.setAttribute('style', 'padding: 0px; border: 0px;');
			cell.innerHTML = '<textarea defaulttext="ingresa un comentario..." oname="tips.description" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');">ingresa un comentario...</textarea>';
			cell.firstChild.focus();
			cell.focus();
			
			// load async the joiners
			worker.executeAsync(function(){ return worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild.rows[worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild.rows.length - 2].cells[0].firstChild; }, 'timeout', 10);
		
		},
		null
		));
	this.pageCodes.push(new Array('profile', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="demo/img/profiles/001.jpg" /></td><td><table><tr><td class="name"></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></td></tr><tr><td colspan="2" class="description"></td></tr></table></div></td></tr><tr><td><div class="profileReturnButton" oname="profile.return" onclick="return worker.execute(this);"><span>Volver</span></div></td><td></tr></table>',
		function(src, eventName)
		{		
			worker.__navigator.bloocruhelper.createMenu();
			var profile = worker.__provider.getPeople(src.getAttribute('peopleId'));
			var table = worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild;
			var dataTable = table.rows[0].cells[1].firstChild;
			dataTable.rows[0].cells[0].innerHTML = profile.firstName.toLowerCase() + ' ' + profile.lastName.toLowerCase();
			dataTable.rows[1].cells[0].innerHTML = profile.roleName.toUpperCase();
			dataTable.rows[2].cells[0].innerHTML = profile.timestamp.substring(0, 10);
			dataTable.rows[4].cells[0].innerHTML = 'actualmente en <span class="cityName">' + profile.cityName + '</span>';
			table.rows[1].cells[0].innerHTML = profile.description;
		
		},
		null
		));
	this.pageCodes.push(new Array('events', '<table class="eventsControl"><tr><td><span class="text">Estas en </span><select oname="events.selector" onChange="return worker.execute(this, \'change\');"></select></td></tr><tr><td><div class="eventsContainer"></div></td></tr></table>',
		function(src, eventName)
		{
			worker.__navigator.area = 'events';
			worker.__navigator.bloocruhelper.createMenu();
			
			var cities = worker.__provider.listCities();
			worker.__navigatorhelper.LoadCitiesSelector(worker.initNode.firstChild.rows[0].cells[0].childNodes[1], cities);
			var data = worker.__provider.loadEvents();

			// generate the page
			var code = '<table>';
			for (var i=0; i < data.items.length; i++)
			{
				code = code + '<tr><td oname="events.eventrow" onmouseover="return worker.execute(this, \'mouseover\');" onmouseout="return worker.execute(this, \'mouseout\');">';
				code = code + '<span class="event_user" peopleId="' + data.items[i].peopleId + '" onclick="return worker.execute(this);" oname="event.user">' + data.items[i].firstName + ' ' + data.items[i].lastName + '</span>' +
					' en <span class="event_place" lat="' + data.items[i].latitude + '" lng="' + data.items[i].longitude + '" zoom="' + data.items[i].zoom +
					'" onclick="return worker.execute(this);" JSonCode=\'' + worker.__provider.toJSon(data.items[i]) + '\' oname="event.place">' + data.items[i].placeName + '</span>' +
					' <span class="event_time" time="' + data.items[i].timestamp + '">hace un rato</span><br/>' +
					'<span class="event_message" JSonCode=\'' + worker.__provider.toJSon(data.items[i]) + '\'  onclick="return worker.execute(this);" oname="event.message">' + data.items[i].description + '</span>';
				code = code + '</td></tr>';
			}
			code = code + '</table>';
			var div = document.createElement('div');
			div.innerHTML = code;
			worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(div.firstChild);
			
			// add the write node...
			var table = worker.initNode.firstChild.rows[1].cells[0].firstChild.firstChild;
			var cell = table.insertRow(0).insertCell(0);
			cell.setAttribute('class', 'commentButtons');
			cell.setAttribute('style', 'padding: 0px; border: 0px;');
			cell.innerHTML = '<span class="eventloadmapbutton" oname="event.loadmap" onclick="return worker.execute(this);">revisa el mapa</span>';
		
		},
		null
		));
	this.pageCodes.push(new Array('event', '<table class="EventControl"><tr><td class="mapCell"></td></tr><tr><td><div class="buttons"><span class="addButton" oname="place.add" onclick="return worker.execute(this);">agregar</span><span class="returnButton" oname="place.return" onclick="return worker.execute(this);">volver</span></div></td></tr></table>',
		function (src, eventName)
		{
			worker.__navigator.bloocruhelper.createMenu();
			
			var data = worker.__provider.fromJSon(src.getAttribute('JSonCode'));
			GmapHelper.getMap(worker.initNode.firstChild.rows[0].cells[0]);
			GmapHelper.createMark(data.latitude, data.longitude, data.zoom, data.description);
		
		},
		null
		));
	this.pageCodes.push(new Array('eventmessage', '<table class="tipControl"><tr><td colspan="2"><div class="tipContainer"></div></td></tr></table>',
		function (src, eventName)
		{
			worker.__navigator.bloocruhelper.createMenu();
			
			var data = worker.__provider.fromJSon(src.getAttribute('JSonCode'));
			var innerCode = '';
			
			var messages = worker.__provider.loadConversationsByEventId(data.id);
			if (messages != null)
			{
				for (var i = 0; i < messages.items.length; i++)
				{
					innerCode = innerCode + '<tr><td><span class="event_user">' + messages.items[i].firstName + ' ' + messages.items[i].lastName +
						'</span> dice <span class="event_message">' + messages.items[i].text + '</span> <span class="event_time">hace un rato</span></td></tr>';
				}
			}
			
			code = '<tr><td><span style="cursor: default;" class="event_user" peopleId="' + data.peopleId + '">' + data.firstName + ' ' + data.lastName + '</span>' +
				' en <span style="cursor: default;" class="event_place">' + data.placeName + '</span>' +
				' <span class="event_time" time="' + data.timestamp + '">hace un rato</span><br/>' +
				'<span class="event_message">' + data.description + '</span>' + '</td></tr>';
			
			innerCode='<table class="eventsControl">' + code + innerCode + '</table>';
			worker.initNode.firstChild.rows[0].cells[0].firstChild.innerHTML = innerCode;
			
			// add the write node...
			var table = worker.initNode.firstChild.rows[0].cells[0].firstChild.firstChild;
			var cell = table.insertRow(table.rows.length).insertCell(0);
			cell.setAttribute('class', 'commentButtons');
			cell.setAttribute('style', 'padding: 0px; border: 0px;');
			cell.innerHTML = '<span oname="eventmessage.return" class="eventMessageReturn" onclick="return worker.execute(this);">volver</span><span class="comment" oname="eventmessage.comment" style="margin-left:200px;" JSonCode=\'' + src.getAttribute('JSonCode') + '\' onclick="return worker.execute(this);">comenta</span>';
			cell = table.insertRow(table.rows.length).insertCell(0);
			cell.setAttribute('class', 'commentText');
			cell.setAttribute('style', 'padding: 0px; border: 0px;');
			cell.innerHTML = '<textarea defaulttext="ingresa un comentario..." oname="eventmessage.commenttext" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');">ingresa un comentario...</textarea>';
			cell.firstChild.focus();
			cell.focus();
		
		},
		null
		));
	this.pageCodes.push(new Array('eventsmap', '<table class="EventControl"><tr><td class="mapCell"></td></tr><tr><td><div class="buttons"><span class="addButton" oname="place.add" onclick="return worker.execute(this);">agregar</span><span class="returnButton" oname="place.return" onclick="return worker.execute(this);">volver</span></div></td></tr></table>',
		function (src, eventName)
		{
			worker.__navigator.bloocruhelper.createMenu();
			
			var data = new Array();
			var cbo;
			if (worker.__provider.eventsCache == null) worker.__provider.loadEvents();
			for (var i = 0; i < worker.__provider.eventsCache.items.length; i++)
			{
				cbo = worker.__provider.eventsCache.items[i];
				form = '<table class="placeForm">' + 
					'<tr><td style="text-align: center;"><span class="placeAuthor">' + cbo.firstName + ' ' + cbo.lastName + '</span> - ' +
					'<span class="placeTitle">' + cbo.placeName + '</span></td></tr>' + 
					'<tr><td><div class="placeDescription">' + cbo.description + '</div></td></tr>' +
					'</table>';
				data.push({"latitude": cbo.latitude, "longitude": cbo.longitude, "zoom": cbo.zoom, "label": cbo.firstName + ' ' + cbo.lastName + ': ' + cbo.placeName, "form": form });
			}
			GmapHelper.getMap(worker.initNode.firstChild.rows[0].cells[0]);
			GmapHelper.loadPlaces(data);
			// lat, lng, zoom
			GmapHelper.setPosition(worker.__provider.currentCity.latitude, worker.__provider.currentCity.longitude, worker.__provider.currentCity.zoom);
		
		},
		null
		));
	this.pageCodes.push(new Array('connectedUsers', '<table class="ConnectedPeopleControl"><tr><td class="citySelector"><span class="text">Estas en </span><select oname="connected.selector" onChange="return worker.execute(this, \'change\');"></select></td></tr><tr><td class="detailTables" oname="connected.autoreload"><table class="peopleControlConnected"><tr><th colspan="2">conectados</th></tr></table></td></tr><tr><td><table class="peopleControlWaiting"><tr><th colspan="2">esperando</th></tr></table></td></tr><tr><td><table class="peopleControlDisconnected"><tr><th colspan="2">desconectados</th></tr></table></td></tr><tr><td class="bottom"></td></tr></table>',
		function (src, eventName)
		{
			worker.__navigator.area = 'connected';
			worker.__navigator.bloocruhelper.createMenu();
			
			var cities = worker.__provider.listCities();
			worker.__navigatorhelper.LoadCitiesSelector(worker.initNode.firstChild.rows[0].cells[0].childNodes[1], cities);
			
			var tableconnected = worker.initNode.firstChild.rows[1].cells[0].firstChild;
			var tablewaiting = worker.initNode.firstChild.rows[2].cells[0].firstChild;
			var tabledisconnected = worker.initNode.firstChild.rows[3].cells[0].firstChild;
			var users = worker.__provider.listConnectedPeople();
			var cell, row;
			
			if (users != null)
			{
				for(var index in users.items)
				{
					user = users.items[index];
					cell = null;
					switch(user.connectedStatus)
					{
						case 0: // disconnected
							row = tabledisconnected.insertRow(tabledisconnected.rows.length);
							cell = row.insertCell(0);
							cell.setAttribute('class', 'statusDisconnected');
							cell = row.insertCell(1);
							cell.setAttribute('class', 'nameDisconnected');
							break;
						case 1: // connected
							row = tableconnected.insertRow(tableconnected.rows.length);
							cell = row.insertCell(0);
							cell.setAttribute('class', 'statusConnected');
							cell = row.insertCell(1);
							cell.setAttribute('class', 'nameConnected');
							break;
						case 2: // waiting
							row = tablewaiting.insertRow(tablewaiting.rows.length);
							cell = row.insertCell(0);
							cell.setAttribute('class', 'statusWaiting');
							cell = row.insertCell(1);
							cell.setAttribute('class', 'nameWaiting');
							break;
					}
					if (cell != null)
					{
						cell.innerHTML = '' + user.firstName + ' ' + user.lastName + '';
						cell.setAttribute('oname', 'connected.people');
						cell.setAttribute('JSonCode', worker.__provider.toJSon(user));
						worker.__provider.attachEvent(cell, 'click', function(){return worker.execute(this);});
					}
				}
			}
			var timeoutId = worker.executeAsync(function(){ return worker.initNode.firstChild.rows[1].cells[0]; }, 'timeout', 90000);
			worker.initNode.firstChild.rows[1].cells[0].setAttribute('reloadTimeout', timeoutId);
			worker.__provider.debug('storing timeout var: ' + timeoutId);
		},
		function (src, eventName)
		{
			var timeoutId = worker.initNode.firstChild.rows[1].cells[0].getAttribute('reloadTimeout');
			worker.__provider.debug('clearing timeout var: ' + timeoutId);
			clearTimeout(timeoutId);
		}		
		));
	
	
// Methods
	// get Page
	this.getPage = function ()
			{
				this.holder.innerHTML = this.currentPage[1];
				return this.holder.firstChild;
			}
	// setInitialNode
	this.setInitialNode = function (node)
			{
				this.__initNode = node;
			}
	// execute
	this.execute = function (src, eventName)
			{
				var nodeName = src.getAttribute('oname');
				var output;
				output = this.screenhelper.execute(src, eventName);
				if (output != null)
					return output;
				output = this.helper.execute(src, eventName);
				if (output != null)
					return output;
				
				alert('event not found ' + eventName + ': ' + nodeName);
				return false;
			}
	// navigate
	this.navigate = function (type, pageName, src, eventname)
			{
				// execute the onUnload event in the page
				if (this.currentPage != null)
				{
					if (this.currentPage[3] != null)
					{
						worker.__provider.debug('executing unload event');
						try { this.currentPage[3](src, eventname); }
						catch(e) { worker.__provider.error('problems executing unload event for \'' + this.currentPage[0] + '\'', e); }
					}
				}
				// continue with the navegation
				switch (type)
				{
					case 'home':
						worker.__provider.debug('navigating HOME!');
						this.stackPages = new Array();
						this.ignorePageStack = false;
						this.currentPage = this.homePage;
						this.__initNode.innerHTML = '';
						this.__initNode.appendChild(this.getPage());
						this.executeOnLoadLogic(this.currentPage);
						break;
					case 'back':
						worker.__provider.debug('navigating BACK');
						if (this.__stackPage.length > 0)
							this.__initNode.innerHTML = this.popPage();
						break;
					case 'page':
						var objectName = ((src == null) ? '' : src.getAttribute('oname') );
						var eventName = ((eventname == null) ? '' : eventname);
						worker.__provider.debug('navigating to page "' + pageName + '" (oname=' + objectName + '; event=' + eventName + ';)');
						var page = this.getPageCodes(pageName);
						if (page == null)
						{
							alert('page ' + pageName + ' not found!');
						}
						else
						{
							// store page
							if (! this.ignorePageStack)
								this.pushPage();
							this.ignorePageStack = false;
							
							this.currentPage = page;
							this.__initNode.innerHTML = '';
							this.__initNode.appendChild(this.getPage());
							this.executeOnLoadLogic(src, eventName);
						}
						break;
				}
				
			}
	// executeOnLoadLogic
	this.executeOnLoadLogic = function (src, eventName)
			{
				if (this.currentPage[2] != null)
				{
					try
					{
						this.currentPage[2](src, eventName);
					}
					catch(e)
					{
						worker.__provider.error('problems executing logic for page \'' + this.currentPage[0] + '\'', e);
					}
				}
				return true;
			}
	// getPageCodes
	this.getPageCodes = function (name)
		{
			for (var i = 0; i<this.pageCodes.length; i++)
			{
				if (this.pageCodes[i][0] == name)
					return this.pageCodes[i];
			}
			return null;
		}
	
	// pushPage
	this.ignorePageStack = false;
	this.__stackPage = new Array();
	this.__stackPageMaxNodes = 10;
	this.pushPage = function()
		{
			if (this.__stackPage.length > this.__stackPageMaxNodes)
				this.__stackPage.pop();
			this.__stackPage.push(this.__initNode.innerHTML);
		}
	// popPage
	this.popPage = function()
		{
			if (this.__stackPage.length > 0)
				return this.__stackPage.pop();
			return '';
		}
		
// Constructor
	this.homePage = this.getPageCodes('login');
	this.placeCode = 'scl';
	this.userId = 0;
	this.tipsMessageId = 0;
	this.helper = new NavigatorHelper(this);
	this.screenhelper = new NavigatorScreenHelper(this);
	this.bloocruhelper = new BloocruHelper(this);
	this.stackPages = null;
	
}

