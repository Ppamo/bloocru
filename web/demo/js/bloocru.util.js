function setAttribute(element, attributeName, attributeValue)
{
	if (navigator.appName=='Microsoft Internet Explorer')
	   element[attributeName]=attributeValue;
	else
	   element.setAttribute(attributeName,attributeValue);
}
function getAttribute(element, attributeName)
{
	if (navigator.appName=='Microsoft Internet Explorer')
	   return element[attributeName];
	else
	   return element.getAttribute(attributeName);
}
function setClass(element, className)
{
	if (navigator.appName=='Microsoft Internet Explorer')
	   element['className']=className;
	else
	   element.setAttribute('class',className);
}
function AddClass(element, className)
{
	var className;
	if (navigator.appName=='Microsoft Internet Explorer')
	   className = element['className']=className;
	else
	   className = element.setAttribute('class',className);
	  
	// here I delete the class
}
function RemoveClass(element, className)
{
	var className;
	if (navigator.appName=='Microsoft Internet Explorer')
	   className = element['className']=className;
	else
	   className = element.setAttribute('class',className);
	  
	// here I delete the class
	
}
function attachEvent(element, eventName, handler)
{
	if (element.addEventListener)
		element.addEventListener(eventName, handler, false);
	else if (element.attachEvent)
		element.attachEvent("on" + eventName, handler);
	// else
		// throw "incompatibility issue!!!";
	
}
function detachEvent(element, eventName, handler)
{
	if (element.removeEventListener)
		element.removeEventListener(eventName, handler, true);
	else if (element.attachEvent)
		element.detachEvent("on" + eventName, handler);
	// else
		// throw "incompatibility issue!!!";
}
function createAsyncCall(jsCommand, ms)
{
	// default value for optional parameter
	if (ms == null)
		ms = 100;
	return setTimeout(jsCommand, ms);
}
function loadScriptFromURL(url, onLoadCallback)
{
    var scrt = document.createElement('script');
    scrt.type = 'text/javascript';
    scrt.async = true;
    scrt.src = url;
	if (onLoadCallback != null)
		attachEvent(scrt, 'load', onLoadCallback);

	var scrts = document.getElementsByTagName('script')[0];
    scrts.parentNode.insertBefore(scrt, scrts);
}