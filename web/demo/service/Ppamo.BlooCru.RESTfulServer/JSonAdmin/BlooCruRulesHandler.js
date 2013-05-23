
function BlooCruRulesHandler()
{
	this.provider = new RESTFulClient();
	
	this.dummySession = function()
		{
			this.login = 'paco';
			this.password = 'pass.paco';
			this.openSession();
		}
	// Open Session
	this.openSession = function()
		{
			var error = null;
			try
			{
				RESTFulClient.login = worker.__provider.login;
				RESTFulClient.password = worker.__provider.password;
				RESTFulClient.key = RESTFulClient.getToken(11);
				RESTFulClient.getKey(true);
			}
			catch (e) { this.error('getKey Failed!', e); }
			
			return RESTFulClient.isSessionOpen;
		}
	// Localize
	this.localize = function()
		{ // GET /\\{.*\\}/localize[/]?$
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
	// storeLocalization
	this.storeLocalization = function()
		{ // GET /\\{.*\\}/localize[/]?$
			var error = null;
			try
			{
				var postData = '{"id": ' + this.currentCity.id + '}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/localize', 'POST', postData);
			}
			catch (e) { this.error('set localization', e); }
			
			return RESTFulClient.cboResponse;
		}
	this.getUserProfile = function()
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/profile', 'GET');
			}
			catch (e) { this.error('get profile', e); }
			
			return RESTFulClient.cboResponse;
		}
	// List People
	this.listPeople = function()
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/people', 'GET');
			}
			catch (e) { this.error('list people', e); }
			
			return RESTFulClient.cboResponse;
		}
	// Get People
	this.getPeople = function(id)
		{
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

			return this.citiesCache;
		}
	// Get City
	this.getCity = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + id, 'GET');
			}
			catch (e) { this.error('get city', e); }
			
			return RESTFulClient.cboResponse;
		}
	// getActivity
	this.getActivity = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + id, 'GET');
			}
			catch (e) { this.error('get activity', e); }
			
			return RESTFulClient.cboResponse;
		}
	// LoadActivities
	this.loadActivities = function()
		{
			if (this.activitiesCache == null)
			{
				var error = null;
				try
				{
					RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + this.currentCity.id + '/activity', 'GET');
				}
				catch (e) { this.error('list activities', e); }
				
				if (RESTFulClient.cboResponse.cboTypeName == 'collection:activityCBO')
					this.activitiesCache = RESTFulClient.cboResponse;
			}
			
			return this.activitiesCache;
		}
	// getEvent
	this.getEvent = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + id, 'GET');
			}
			catch (e) { this.error('get event', e); }
			
			return RESTFulClient.cboResponse;
		}
	// loadEvents
	this.loadEvents = function()
		{
			if (this.eventsCache == null)
			{
				var error = null;
				try
				{
					RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/city/' + this.currentCity.id + '/event', 'GET');
				}
				catch (e) { this.error('list events', e); }
				
				if (RESTFulClient.cboResponse.cboTypeName == 'collection:eventsView')
					this.eventsCache = RESTFulClient.cboResponse;
			}
			return this.eventsCache;
		}
	// loadConversationsByEventId
	this.loadConversationsByEventId = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + id + '/conversation', 'GET');
			}
			catch (e) { this.error('load event conversation', e); }
			
			if (typeof(RESTFulClient.cboResponse.items[0]) == "undefined")
				return null;
			return RESTFulClient.cboResponse;
		}
	// loadConversationsByActivityId
	this.loadConversationsByActivityId = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + id + '/conversation', 'GET');
			}
			catch (e) { this.error('load activity conversation', e); }
			
			if (typeof(RESTFulClient.cboResponse.items[0]) == "undefined")
				return null;
			return RESTFulClient.cboResponse;
		}
	// saveEventComment
	this.saveEventComment = function (message, eventId)
		{
			var error = null;
			try
			{
				message = message.replace("\"", "");
				var postData = '{"text": "' + message + '"}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/event/' + eventId + '/conversation', 'POST', postData);
			}
			catch (e) { this.error('savve event comment', e); }
			
			return RESTFulClient.cboResponse;			
		}
	// saveActivityComment
	this.saveActivityComment = function (message, activityId)
		{
			var error = null;
			try
			{
				message = message.replace("\"", "");
				var postData = '{"text": "' + message + '"}';
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + eventId + '/conversation', 'POST', postData);
			}
			catch (e) { this.error('savve activity comment', e); }
			
			return RESTFulClient.cboResponse;
		}
	// * * * * * * * * *
	this.__logger = null;
	this.__logbox = null;
	
	this.setCoords = function (position)
		{
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
	this.updatelog = function ()
		{
			if (this.__logbox == null)
				this.__logbox = document.getElementById('debugBox');
			this.__logbox.innerHTML = "<table><tr><td>" + RESTFulClient.logger.join("</td></tr><tr><td>") + "</td></tr></table>";
		}
	this.debug = function (message)
		{
			RESTFulClient.log("aplog: " + message);
		}
	this.error = function (message, error)
		{
			RESTFulClient.log("error: " + message);
			RESTFulClient.log(this.toNodeString(error));
		}
	RESTFulClient.log = function(message)
		{
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
	// * * * * * * * * *
	// Constructor
	this.login = 'paco';
	this.password = 'pass.paco';
	this.currentCity = null;
	this.coords = null;
	RESTFulClient.maxLogSize = 18;
	// update the debug
	// setInterval(function(){ worker.__provider.updatelog() }, 4500)
	// * * * * * * * * * 
	// C A C H E
	this.citiesCache = null;
	this.eventsCache = null;
	this.activitiesCache = null;
}