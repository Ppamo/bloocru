

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
			return location.protocol + '//' + location.hostname + ((location.port.length == 0) ? '' : ':' + location.port) + window.location.pathname + '/api.json' + this.uri;
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

// * * * * * * * * *

function pageOnLoad()
{
	var callButton = document.getElementById('callButton');
	callButton.setAttribute('ruleIndex', 0);
	
	// create the rules tables
	var div = document.getElementById('slideTab');
	var code = 
		"	<table>" +
		"		<tr>" +
		"			<th colspan='2'>Rules</th>" +
		"		</tr>";
	for (var i = 0; i < rules.length; i++)
	{
		code = code +
			"	<tr ruleIndex='" + i + "' class='rule' onMouseOver='ruleOnMouseOver(this);' onMouseOut='ruleOnMouseOut(this);' onclick='ruleButtonOnClick(this);' >" +
			"		<td>" + rules[i].name + "</td>" +
			"		<td>" +
			"			<div class='ruleButton'/>" +
			"		</td>" +
			"	</tr>";
	}	
	code = code + "	</table>";
	div.innerHTML = code;
	
	// select default rule;
	div.firstChild.rows[1].click();
	
}

// * * * * * * * * *

function callButtonOnClick(src)
{
	
	try
	{
		var useAuth = document.getElementById('useAuthCheck').checked;
		RESTFulClient.useAuthentication = useAuth;
		RESTFulClient.login = getUserFromForm();
		RESTFulClient.password = getPassFromForm();
		var ruleIndex = src.getAttribute('ruleIndex');
		var rule = rules[ruleIndex];
		rule.exec();
		var rawAnswer = document.getElementById('rawTextArea');
		rawAnswer.value = rule.getFormatedResponse();
		var cboAnswer = document.getElementById('cboAnswerDiv');
		cboAnswer.innerHTML = '';
		cboAnswer.appendChild(rule.getCboAnswerAsTable());
		logMessage(RESTFulClient.counter);
	}
	catch (e)
	{
		alert('ButtonOnClickEvent: ' + getErrorMessage(e));
	}
	var debugtab = document.getElementById('debuggerTab');
	debugtab.innerHTML = "<table><tr><td>" + RESTFulClient.logger.join("</td></tr><tr><td>") + "</td></tr></table>";
}

// * * * * * * * * *

function ruleButtonOnClick(src)
{
	var tbody = src.parentNode;
	for (var i = 1; i < tbody.rows.length; i++)
	{
		tbody.rows[i].cells[1].firstChild.className='ruleButton';
	}
	src.cells[1].firstChild.className='ruleButton press';
	// - - - - - 
	processRuleButton(src);
}

// * * * * * * * * *

function ruleOnMouseOver(src)
{
	src.className="ruleHighLight";
}

// * * * * * * * * *

function ruleOnMouseOut(src)
{
	src.className="rule";
}

// * * * * * * * * *

function processRuleButton(src)
{
	var urlinput = document.getElementById('callTextInput');
	var urlpost = document.getElementById('getTextArea');
	var callButton = document.getElementById('callButton');
	var rawAnswer = document.getElementById('rawTextArea');
	var cboAnswer = document.getElementById('cboAnswerDiv');
	var ruleIndex = src.getAttribute('ruleIndex');
	var rule = rules[ruleIndex];
	callButton.setAttribute('ruleIndex', ruleIndex);
	urlinput.value = rule.getFullUri();
	urlpost.value = rule.getPostData();
	selectMethod(rule);
	rawAnswer.value = '';
	cboAnswer.innerHTML = '';
}

// * * * * * * * * *

function selectMethod(rule)
{
	var selector = document.getElementById('callMethodSelector');
	var method = rule.getMethod();
	for (var i = 0; i < selector.options.length; i++)
	{
		if (selector.options[i].text.toUpperCase() == method)
		{
			selector.selectedIndex = i;
			return true;
		}
	}
}

// * * * * * * * * *

function getUserFromForm()
{
	return document.getElementById('userLoginInput').value;
}
function getPassFromForm()
{
	return document.getElementById('userPassInput').value;
}

// * * * * * * * * *

function toString(node, separator)
{
	var code = '';
	if (typeof(separator)=='undefined')
		separator = '\n';
	
	if(typeof(node) == 'object')
	{
		for (var key in node)
		{
			if(typeof(node[key]) != 'function')
				code = code + key + ':' + node[key] + separator;
		}
	}
	return code;
}

// * * * * * * * * *

function getErrorMessage(e)
{
	if (typeof(e)=='undefined') return 'undefined error!';
	if (typeof(e)=='string') return e;
	if (typeof(e)=='error') return e.description;
	return toString(e);
}

// * * * * * * * * *

function logMessage(message)
{
	var logger = document.getElementById('logbar');
	logger.innerHTML = "<span>" + message + "</span>";
}

