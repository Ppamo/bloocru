
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
				if (RESTFulClient.cboResponse.cboTypeName == "collection:cityByName")
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
	
	// * * * * * * * * *
	this.login = 'paco';
	this.password = 'pass.paco';
	this.currentCity = null;
	RESTFulClient.maxLogSize = 10;
	// * * * * * * * * * 
	// C A C H E
	this.citiesCache = null;
}