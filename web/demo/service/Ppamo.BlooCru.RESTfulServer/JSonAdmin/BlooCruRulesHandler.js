
function BlooCruRulesHandler()
{
	this.provider = new RESTFulClient();
	
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
			catch (e) {error = e; alert(e.description);}
			
			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
				catch (e) {error = e;}
				if (RESTFulClient.cboResponse.cboTypeName == "collection:cityCBO")
					this.citiesCache = RESTFulClient.cboResponse;
			}

			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
			return RESTFulClient.cboResponse;
		}
	// Set City
	this.setCity = function()
		{
			// send this.currentCity
		}
	// getActivity
	this.getActivity = function(id)
		{
			var error = null;
			try
			{
				RESTFulClient.execute(RESTFulClient.baseuri + '/{key}/activity/' + id, 'GET');
			}
			catch (e) {error = e;}
			
			this.updatelog();
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
				catch (e) {error = e;}
				
				this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
				catch (e) {error = e;}
				
				this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
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
			catch (e) {error = e;}
			
			this.updatelog();
			return RESTFulClient.cboResponse;			
		}
	// saveActivityComment
	this.saveActivityComment = function (message, activityId)
		{
			
		}
	// * * * * * * * * *
	this.__logger = null;
	this.updatelog = function ()
		{
			if (this.__logger == null) this.__logger = document.getElementById('debugBox');
			this.__logger.innerHTML = "<table><tr><td>" + RESTFulClient.logger.join("</td></tr><tr><td>") + "</td></tr></table>";
		}
	// * * * * * * * * *
	this.login = 'paco';
	this.password = 'pass.paco';
	this.currentCity = null;
	RESTFulClient.maxLogSize = 15;
	// * * * * * * * * * 
	// C A C H E
	this.citiesCache = null;
	this.eventsCache = null;
	this.activitiesCache = null;
}