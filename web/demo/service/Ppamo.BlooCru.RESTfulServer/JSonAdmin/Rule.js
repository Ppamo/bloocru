
// Rule Class
function Rule(Name, Method, Uri, PostData)
{
	this.exec = function()
	{
		try
		{
			// alert('executing: ' + this.loadMethod() + ' ' + this.loadFullUri() + ' - ' + this.loadPostData());
			RESTFulClient.execute(this.loadFullUri(), this.loadMethod(), this.loadPostData());
			this.cboResponse = RESTFulClient.cboResponse;
			this.jsonCode = RESTFulClient.rawCode;
			this.rawResponse = RESTFulClient.rawResponse;
		}
		catch(e)
		{
			alert('exception ' + getErrorMessage(e));
		}
	}
	// getMethod
	this.getMethod = function()
		{
			if (typeof(this.method) == "undefined")
				return 'GET';
			if (this.method == '*')
				return 'GET';
			return this.method.toUpperCase();
		};
	// getFullUri
	this.getFullUri = function()
		{
			return location.protocol + '//' + location.hostname + ((location.port.length == 0) ? '' : ':' + location.port) + ((location.pathname == '/') ? '' : location.pathname) + '/api.json' + this.uri;
		}
	// getPostData
	this.getPostData = function()
		{
			return this.postdata;
		}
	// getFormatedResponse
	this.getFormatedResponse = function()
		{
			if (typeof(this.jsonCode) == "string")
				return this.jsonCode;
			else
				return toString(this.jsonCode);
		}
	// loadMethod
	this.loadMethod = function()
		{	
			var selector = document.getElementById('callMethodSelector');
			return selector.options[selector.selectedIndex].text.toUpperCase();
		}
	// loadFullUri
	this.loadFullUri = function()
		{
			var urlinput = document.getElementById('callTextInput');
			return urlinput.value;
		}
	// loadPostData
	this.loadPostData = function()
		{
			var urlpost = document.getElementById('getTextArea');
			return urlpost.value;
		}
	// getCboAnswerAsTable
	this.getCboAnswerAsTable = function()
		{
			var output = document.createElement('table');
			if ((this.cboResponse != null) && (typeof(this.cboResponse.cboTypeName) != "undefined"))
			{
				var typeName = this.cboResponse.cboTypeName.split(':')[0];
				switch (typeName)
				{
					case 'cbo':
						var div = document.createElement('div');
						var code = '<table>' + 
							'<tr><th colspan="2" class="cbotablename">name</th><th class="cbotablevalue" colspan="2">value</th></tr>';
						for (var key in this.cboResponse)
						{
							if(typeof(this.cboResponse[key]) != 'function')
								code = code + '<tr><td></td><td>' + key + '</td><td>' + this.cboResponse[key] + '</td><td></td></tr>';
						}
						code = code + '</table>';
						div.innerHTML = code;
						output = div.firstChild;
						break;
					case 'collection':
						var div = document.createElement('div');
						var code = '<table>' + 
							'<tr><th colspan="2" class="cbotablename">name</th><th class="cbotablevalue" colspan="2">value</th></tr>' + 
							'<tr><td></td><td>cboTypeName</td><td>' + this.cboResponse.cboTypeName + '</td><td></td></tr>';
						for (var i=0; i<this.cboResponse.items.length; i++)
						{
							code = code + '<tr><td></td><td>item ' + (i+1) + '</td><td>' + toString(this.cboResponse.items[i], ';') + '</td><td></td></tr>';
						}
						code = code + '</table>';
						div.innerHTML = code;
						output = div.firstChild;
						break;
					case 'exception':
						var div = document.createElement('div');
						div.innerHTML = '<table>' + 
							'<tr><th colspan="2" class="cbotablename">name</th><th class="cbotablevalue" colspan="2">value</th></tr>' + 
							'<tr><td></td><td>cboTypeName</td><td>' + this.cboResponse.cboTypeName + '</td><td></td></tr>' + 
							'<tr><td></td><td>code</td><td>' + this.cboResponse.code + '</td><td></td></tr>' + 
							'<tr><td></td><td>message</td><td>' + this.cboResponse.message + '</td><td></td></tr>' + 
							'<tr><td></td><td>trace</td><td>' + this.cboResponse.trace + '</td><td></td></tr>' + 
							'<tr><td></td><td>source</td><td>' + this.cboResponse.source + '</td><td></td></tr>' + 
							'</table>';
						output = div.firstChild;
						break;
				}
			}
			return output;
		}
	
	// Constructor
	if (typeof(Name) == "undefined") Name = '';
	if (typeof(Method) == "undefined") Method = '';
	if (typeof(Uri) == "undefined") Uri = '';
	if (typeof(PostData) == "undefined") PostData = '';
	
	// Properties
	this.name = Name;
	this.uri = Uri;
	this.method = Method;
	this.postdata = PostData;
	this.rawResponse = null;
	this.jsonCode = '';
	this.cboResponse = null;
	
	// Static properties?
	// Rule.executingRule = null;
	this.provider = new RESTFulClient();
}
