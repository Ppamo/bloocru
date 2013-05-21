
function BlooCruRulesHandler()
{
	this.provider = new RESTFulClient();
	
	// Open Session
	this.openSession = function()
		{
			var error = null;
			try
			{
				RESTFulClient.login = worker.provider.login;
				RESTFulClient.password = worker.provider.password;
				RESTFulClient.key = RESTFulClient.getToken(11);
				RESTFulClient.getKey(true);
			}
			catch (e) {error = e;}
			updateDebug();
					
			if (! RESTFulClient.isSessionOpen)
				return 'login o password incorrectas';
				
			return null;
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
			updateDebug();
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
			updateDebug();
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
			updateDebug();
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

			updateDebug();
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
			updateDebug();
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
			updateDebug();
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
				updateDebug();
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
			updateDebug();
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
				updateDebug();
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
			updateDebug();
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
			updateDebug();
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
			updateDebug();
			
			return RESTFulClient.cboResponse;			
		}
	// saveActivityComment
	this.saveActivityComment = function (message, activityId)
		{
			
		}
	
	// * * * * * * * * *
	this.login = 'paco';
	this.password = 'pass.paco';
	this.currentCity = null;
	RESTFulClient.maxLogSize = 10;
	// * * * * * * * * * 
	// C A C H E
	this.citiesCache = null;
	this.eventsCache = null;
	this.activitiesCache = null;
}