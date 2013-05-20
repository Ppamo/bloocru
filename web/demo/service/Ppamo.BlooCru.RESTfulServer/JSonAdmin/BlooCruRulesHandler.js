
function BlooCruRulesHandler()
{
	this.provider = new RESTFulClient();

	this.rules = new Array();
	this.rules.push(new Rule('Sync', 'GET', '/sync', '')); // sync
	this.rules[this.rules.length - 1].exec = function ()
		{
			RESTFulClient.sync();
			this.cboResponse = RESTFulClient.cboResponse;
			this.jsonCode = RESTFulClient.rawCode;
			this.rawResponse = RESTFulClient.rawResponse;
		}
	this.rules.push(new Rule('Open Session', 'POST', '/session', '')); // open session
	this.rules[this.rules.length - 1].postdata = RESTFulClient.getKeyClientPostData();
	this.rules[this.rules.length - 1].exec = function ()
		{
			this.provider.login = getUserFromForm();
			this.provider.password = getPassFromForm();
			this.provider.key = RESTFulClient.getToken(11);
			RESTFulClient.getKey();
			this.cboResponse = null;
			this.jsonCode = RESTFulClient.rawCode;
			this.rawResponse = RESTFulClient.rawResponse;
			this.jsonCode = "{\"openSession\": " + RESTFulClient.isSessionOpen + "}";
		};
	//  *  *  *  *  *  *  *  *
	this.rules.push(new Rule('Localize', 'GET', '/{key}/localize')); //	POST /\\{.*\\}/localize[/]?$
	this.rules.push(new Rule('List People', 'GET', '/{key}/people')); // GET /\\{.*\\}/people[/]?$
	this.rules.push(new Rule('Get People', 'GET', '/{key}/people/{id}')); // GET /\\{.*\\}/people/[0-9]+$
	this.rules.push(new Rule('List Places', 'GET', '/{key}/place')); // "^GET /\\{.*\\}/place[/]?$"
	this.rules.push(new Rule('Get Place', 'GET', '/{key}/place/{id}')); // "^GET /\\{.*\\}/place/[0-9]+$"
	/*
	BlooCruRulesHandler.rules.push(new Rule('Create Place', 'POST', '/{key}/place')); // "^POST /\\{.*\\}/place[/]?$"
	BlooCruRulesHandler.rules[BlooCruRulesHandler.rules.length - 1].postdata = "qweqrtt";
	BlooCruRulesHandler.rules.push(new Rule('Create People', 'POST', '/{key}/people')); // "^POST /\\{.*\\}/people[/]?$"
	BlooCruRulesHandler.rules[BlooCruRulesHandler.rules.length - 1].postdata = "gfdgh";
	BlooCruRulesHandler.rules.push(new Rule('Update Place', 'PUT', '/{key}/place/{id}')); // "^PUT /\\{.*\\}/place/[0-9]+$"
	BlooCruRulesHandler.rules[BlooCruRulesHandler.rules.length - 1].postdata = "afsasfsg";
	BlooCruRulesHandler.rules.push(new Rule('Update People', 'PUT', '/{key}/people/{id}')); // "^PUT /\\{.*\\}/people/[0-9]+$"
	BlooCruRulesHandler.rules[BlooCruRulesHandler.rules.length - 1].postdata = "asdadasdas";
	BlooCruRulesHandler.rules.push(new Rule('Delete Place', 'DELETE', '/{key}/place/{id}')); // "^DELETE /\\{.*\\}/place/[0-9]+$"
	BlooCruRulesHandler.rules.push(new Rule('Delete People', 'DELETE', '/{key}/people/{id}')); // "^DELETE /\\{.*\\}/people/[0-9]+$"
	*/
	this.rules.push(new Rule('Default Rule', '*', '/')); // ".*"


}