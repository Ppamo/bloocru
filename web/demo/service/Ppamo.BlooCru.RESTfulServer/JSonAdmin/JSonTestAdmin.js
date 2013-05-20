

var rulesHandler = new BlooCruRulesHandler();

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
		
	for (var i = 0; i < rulesHandler.rules.length; i++)
	{
		code = code +
			"	<tr ruleIndex='" + i + "' class='rule' onMouseOver='ruleOnMouseOver(this);' onMouseOut='ruleOnMouseOut(this);' onclick='ruleButtonOnClick(this);' >" +
			"		<td>" + rulesHandler.rules[i].name + "</td>" +
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
		var rule = rulesHandler.rules[ruleIndex];
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
	var rule = rulesHandler.rules[ruleIndex];
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

