
function BlooCruRulesHandler()
{
	this.provider = new RESTFulClient();
	this.maphelper = new GMAPHelper();
	
	this.dummySession = function()
		{
			this.info('dummySession()');
			this.login = 'paco';
			this.password = 'pass.paco';
			this.openSession();
			worker.__provider.currentCity = worker.__provider.listCities().items[2];
			// sync the debugger
			GMAPHelper.setDate(RESTFulClient.timestamp);
		}
	// Open Session
	this.openSession = function()
		{
			this.info('openSession()');
			var error = null;
			try
			{
				RESTFulClient.login = worker.__provider.login;
				RESTFulClient.password = worker.__provider.password;
				RESTFulClient.key = RESTFulClient.getToken(11);
				RESTFulClient.getKey(true);
				if (RESTFulClient.isSessionOpen)
					this.getUserProfile();
			}
			catch (e) { this.error('getKey Failed!', e); }
			
			return RESTFulClient.isSessionOpen;
		}
	// Localize
	this.localize = function()
		{
			this.info('localize()');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/localize', 'GET');
			}
			catch (e) { this.error('get localization', e); }
			
			if (RESTFulClient.cboResponse.cboTypeName == "cbo:cityCBO")
				this.currentCity = RESTFulClient.cboResponse;
			return RESTFulClient.cboResponse;
		}
	// Store Localization
	this.storeLocalization = function()
		{
			this.info('storeLocalization()');
			var error = null;
			try
			{
				var postData = '{"id": ' + this.currentCity.id + '}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/localize', 'POST', postData);
			}
			catch (e) { this.error('set localization', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Get User Profile
	this.getUserProfile = function()
		{
			this.info('getUserProfile()');
			if (this.profileCache == null)
			{
				var error = null;
				try
				{
					RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/profile', 'GET');
				}
				catch (e) { this.error('get profile', e); }
				this.profileCache = RESTFulClient.cboResponse;
			}
			else
				this.debug('using profileCache cache');
			
			return this.profileCache;
		}
	// Set User Profile
	this.saveUserProfile = function()
		{
			this.info('saveUserProfile()');
			
			var error = null;
			try
			{
				var postData = '{"peopleId": ' + this.profileCache.peopleId + ',"firstName": "' + this.profileCache.firstName +
					'","lastName": "' + this.profileCache.lastName + '","birthDate": "' + this.profileCache.birthDate + 
					'","description": "' + this.profileCache.description + '","roleId": ' + this.profileCache.roleId + '}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/profile', 'POST', postData);
			}
			catch (e) { this.error('get profile', e); }
			this.profileCache = RESTFulClient.cboResponse;
			
			return this.profileCache;
		}
	// List People
	this.listPeople = function()
		{
			this.info('listPeople()');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/people', 'GET');
			}
			catch (e) { this.error('list people', e); }
			
			return RESTFulClient.cboResponse;
		}
	// List Connected People
	this.listConnectedPeople = function()
		{
			this.info('listConnectedPeople()');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + this.currentCity.id + '/people', 'GET');
			}
			catch (e) { this.error('list connected people', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Get People
	this.getPeople = function(id)
		{
			this.info('getPeople (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/people/' + id, 'GET');
			}
			catch (e) { this.error('get people', e); }
			
			return RESTFulClient.cboResponse;
		}
	// List Cities
	this.listCities = function()
		{
			this.info('listCities()');
			if (this.citiesCache == null)
			{
				var error = null;
				try
				{
					RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city', 'GET');
				}
				catch (e) { this.error('list cities', e); }
				
				if (RESTFulClient.cboResponse.cboTypeName == "collection:cityCBO")
					this.citiesCache = RESTFulClient.cboResponse;
			}
			else
				this.debug('using cache');

			return this.citiesCache;
		}
	// Get City
	this.getCity = function(id)
		{
			this.info('getCity (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + id, 'GET');
			}
			catch (e) { this.error('get city', e); }
			
			return RESTFulClient.cboResponse;
		}
	// List Roles
	this.listRoles = function()
		{
			this.info('listRoles()');
			if (this.roleCache == null)
			{
				var error = null;
				try
				{
					RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/role', 'GET');
				}
				catch (e) { this.error('list roles', e); }
				if (RESTFulClient.cboResponse.cboTypeName == "collection:roleCBO")
					this.roleCache = RESTFulClient.cboResponse;
			}
			else
				this.debug('using cache');

			return this.roleCache;
		}
	// Get Activity
	this.getActivity = function(id)
		{
			this.info('getActivity (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + id, 'GET');
			}
			catch (e) { this.error('get activity', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Load Activities
	this.loadActivities = function()
		{
			this.info('loadActivities()');
			this.activitiesCache = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + this.currentCity.id + '/activity', 'GET');
			}
			catch (e) { this.error('list activities', e); }
			
			if (RESTFulClient.cboResponse.cboTypeName == 'collection:activitiesView')
				this.activitiesCache = RESTFulClient.cboResponse;
					
			return this.activitiesCache;
		}
	// Get Event
	this.getEvent = function(id)
		{
			this.info('getEvent (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + id, 'GET');
			}
			catch (e) { this.error('get event', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Load Events
	this.loadEvents = function()
		{
			this.info('loadEvents()');
			this.eventsCache = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + this.currentCity.id + '/event', 'GET');
			}
			catch (e) { this.error('list events', e); }
			
			if (RESTFulClient.cboResponse.cboTypeName == 'collection:eventsView')
				this.eventsCache = RESTFulClient.cboResponse;
								
			return this.eventsCache
		}
	// Load Conversations By Event Id
	this.loadConversationsByEventId = function(id)
		{
			this.info('loadConversationsByEventId (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + id + '/conversation', 'GET');
			}
			catch (e) { this.error('load event conversation', e); }
			
			if (RESTFulClient.cboResponse.cboTypeName == "collection:conversationView")
				return RESTFulClient.cboResponse;
				
			return null;
		}
	// Load Conversations By Activity Id
	this.loadConversationsByActivityId = function(id)
		{
			this.info('loadConversationsByActivityId (' + id + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + id + '/conversation', 'GET');
			}
			catch (e) { this.error('load activity conversation', e); }
			
			if (RESTFulClient.cboResponse.cboTypeName == "collection:conversationView")
				return RESTFulClient.cboResponse;
				
			return null;
		}
	// Save Activity
	this.saveActivity = function (title, message)
		{
			this.info('saveActivity ("' + title + '", "' + message + '")');
			var error = null;
			try
			{
				message = message.replace("\"", "'");
				title = title.replace("\"", "'");
				var postData = '{"title": "' + title + '","description": "' + message + '", "cityId": ' + this.currentCity.id + '}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity', 'POST', postData);
			}
			catch (e) { this.error('save activity comment', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Save Event
	this.saveEvent = function (title, description, latitude, longitude, zoom)
		{
			this.info('saveEvent (' + title + ', '  + description + ', '  + latitude + ', '  + longitude + ', ' + zoom + ')');
			var error = null;
			try
			{
				title = title.replace("\"", "'");
				description = description.replace("\"", "'");
				var postData = '{"peopleId": ' + this.getUserProfile().peopleId + ', "cityId": "' + this.currentCity.id + '","placeName":"' + title + '","latitude":' + latitude + ',"longitude":' + longitude + ',"zoom":' + zoom + ',"description":"' + description + '"}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/', 'POST', postData);
			}
			catch (e) { this.error('save activity comment', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Save Event Comment
	this.saveEventComment = function (message, eventId)
		{
			this.info('saveEventComment (' + message + ', ' + eventId + ')');
			var error = null;
			try
			{
				message = message.replace("\"", "");
				var postData = '{"text": "' + message + '"}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + eventId + '/conversation', 'POST', postData);
			}
			catch (e) { this.error('save event comment', e); }
			
			return RESTFulClient.cboResponse;			
		}
	// Save Activity Comment
	this.saveActivityComment = function (message, activityId)
		{
			this.info('saveActivityComment (' + message + ', ' + activityId + ')');
			var error = null;
			try
			{
				message = message.replace("\"", "");
				var postData = '{"text": "' + message + '"}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + activityId + '/conversation', 'POST', postData);
			}
			catch (e) { this.error('save activity comment', e); }
			
			return RESTFulClient.cboResponse;
		}
	// List Joined People
	this.listJoinedPeople = function(activityId)
		{
			this.info('listJoinedPeople(' + activityId + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + activityId + '/joined', 'GET');
			}
			catch (e) { this.error('list joined people', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Join Activity
	this.joinActivity = function (activityId)
		{
			this.info('joinActivity (' + activityId + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + activityId + '/join', 'GET');
			}
			catch (e) { this.error('joining activity', e); }
			
			return RESTFulClient.cboResponse;
		}
	// UnJoin Activity
	this.unjoinActivity = function (activityId)
		{
			this.info('unjoinActivity (' + activityId + ')');
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + activityId + '/unjoin', 'GET');
			}
			catch (e) { this.error('unjoining activity', e); }
			
			return RESTFulClient.cboResponse;
		}
		
	// * * * * * * * * *
	
	this.__logger = null;
	this.__logbox = null;
	
	this.setCoords = function (position)
		{
			this.info('setCoords (' + position + ')');
			if (position != null)
			{
				this.coords = position.coords;
				this.debug('localized - lat=' + position.coords.latitude + '   lgn=' + position.coords.longitude );
				// load the cities and find the closest one
				var cities = this.listCities();
				var closestId = -1;
				var closestDistance = 3; // the limit of distance to say that you are in a city
				var lat, lgn, distance;
				for (var i = 0; i < cities.items.length; i++)
				{
					lat = position.coords.latitude - cities.items[i].latitude;
					lat = lat * lat;
					lgn = position.coords.longitude - cities.items[i].longitude;
					lgn = lgn * lgn;
					distance = Math.sqrt(lat + lgn);
					if (distance < closestDistance)
					{
						closestId = i;
						closestDistance = distance;
					}
				}
				if (closestId != -1)
				{
					if (this.currentCity.name != cities.items[closestId].name)
					{
						this.debug('changing current city to: ' + cities.items[closestId].name);
						this.currentCity = cities.items[closestId];
						// store the new city in the session
						this.storeLocalization();
					}
				}
			}
			else
				this.debug('unable to get localization');
		}
		
	// * * * * * * * * *
	
	this.setCityById = function(id)
		{
			this.info('setCityById (' + id + ')');
			var cities = this.listCities();
			for (var i = 0; i < cities.items.length; i++)
			{
				if (cities.items[i].id == id)
				{
					this.currentCity = cities.items[i];
					break;
				}
			}
		}
		
	// * * * * * * * * *
	
	this.GMAPDebug = function (message)
		{
			RESTFulClient.log("gmap : " + message);
		}
	this.GMAPError = function (message, error)
		{
			RESTFulClient.log("error: " + message);
			var text = this.toNodeString(error);
			if (text == '')
				text = error.toString();
			RESTFulClient.log(text);
		}
	this.debug = function (message)
		{
			RESTFulClient.log("aplog: " + message);
		}
	this.error = function (message, error)
		{
			RESTFulClient.log("error: " + message);
			var text = this.toNodeString(error);
			if (text == '')
				text = error.toString();
			RESTFulClient.log(text);
		}
	this.info = function (message)
		{
			RESTFulClient.log("info : " + message);
		}
	this.toNodeString = function (node, separator)
		{
			var output = '';
			if (typeof(separator)=='undefined')
				separator = '\n';
			
			if(typeof(node) == 'object')
				for (var key in node)
					if(typeof(node[key]) != 'function')
						output = output + key + ':' + node[key] + separator;

			return output;
		}
	this.toFullString = function (node, separator)
		{
			var output = '';
			if (typeof(separator)=='undefined')
				separator = '\n';
			
			if(typeof(node) == 'object')
				for (var key in node)
					output = output + key + ':' + node[key] + separator;

			return output;
		}
	this.toJSon = function (node, properties)
		{
			if (typeof(separator)=='undefined') separator = ',';
			var output = '';
			
			if(typeof(node) == 'object')
			{
				properties = (properties == null) ? null :  ',' + properties + ',' ;
				
				if (properties != null)
				{
					for (var key in node)
					{
						if(typeof(node[key]) != 'function')
							if (properties.indexOf(',' + key + ',') >= 0)
								output = output + separator + '"' + key + '":' + ((isNaN(node[key])) ? '"' + node[key] + '"' : node[key]) ;
					}
				}
				else
				{
					for (var key in node)
					{
						if(typeof(node[key]) != 'function')
							output = output + separator + '"' + key + '":' + ((isNaN(node[key])) ? '"' + node[key] + '"' : node[key]) ;
					}
				}
			}
			
			return '{' + ((output.length > 0) ? output.substring(1) : '' ) + '}';
		}
	this.fromJSon = function (code)
		{
			return $.parseJSON(code);
		}
		
	this.attachEvent = function (element, eventName, handler)
		{
			if (element.addEventListener)
				element.addEventListener(eventName, handler, false);
			else if (element.attachEvent)
				element.attachEvent("on" + eventName, handler);
		}
	this.detachEvent = function (element, eventName, handler)
		{
			if (element.removeEventListener)
				element.removeEventListener(eventName, handler, true);
			else if (element.attachEvent)
				element.detachEvent("on" + eventName, handler);
		}

	RESTFulClient.log = function(message)
		{
			if (! worker.__provider.debugEnabled)
				return false;
			if (worker.__logbox == null)
				worker.__logbox = document.getElementById('debugBox');
				
				
			if (RESTFulClient.logger.length > RESTFulClient.maxLogSize)
			{
				RESTFulClient.logger.pop();
				worker.__logbox.deleteRow(-1);
			}
			var text = RESTFulClient.getFormatedDate().toString() + " - " + message;
			var row = worker.__logbox.insertRow(0);
			var cell = row.insertCell(0);
			cell.innerHTML = text;
			RESTFulClient.logger.unshift(text);
			cell.className = message.substring(0,5);
		}
	GMAPHelper.log = function(message)
		{
			RESTFulClient.log("gmap " + message.substring(5));
		}
		
	// * * * * * * * * *
	// Constructor
	this.login = '';
	this.password = '';
	this.currentCity = null;
	this.coords = null;
	this.debugEnabled = false;
	RESTFulClient.maxLogSize = 50;
	// update the debug
	// setInterval(function(){ worker.__provider.updatelog() }, 4500)
	// * * * * * * * * * 
	// C A C H E
	this.roleCache = null;
	this.citiesCache = null;
	this.profileCache = null;
	this.activitiesCache = null;
	this.activitiesCacheId = -1;
	this.eventsCache = null;
	this.eventsCacheId = -1;
	// DATA BUFFER
	this.buffer = null;
}

