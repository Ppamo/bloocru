
function Worker()
{
	var nav, style, data;

// methods
	// loadScript
	this.loadScript = function (path, onLoadCode)
		{
			// load the script
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = path;
			head.appendChild(script);
			if (onLoadCode != null)
			{
				script.onreadystatechange = function ()
				{
					if (this.readyState == 'complete')
						onLoadCode();
				}
			}
		}
	
	// setInitialNode
	this.setInitialNode = function(node)
		{
			this.initNode = node;
			this.__navigator.setInitialNode(this.initNode);
		}
	this.start = function()
	{
		this.__navigator.navigate('home');
		// worker.__provider.dummySession();
		// this.__navigator.navigate('page', 'events');
	}
	this.getPage = function()
		{
			this.initNode.innerHTML = '';
			this.initNode.appendChild(this.__navigator.getPage());
			return true;
		}
	this.execute = function(src, eventName)
		{
			var output = false;
			try
			{
				if (eventName == null)
					eventName = 'click';
				var oname = src.getAttribute('oname');
				worker.__provider.debug('executing event ' + eventName + ' over ' + oname);
				output = this.__navigator.execute(src, eventName);
			}
			catch (e)
			{
				worker.__provider.error('exception executing event ' + eventName + ' over ' + oname, e);
			}
			return output;
		}
	this.executeAsync = function (getter, eventName, timeout)
		{
			if (eventName == null)
				eventName = 'click';
			setTimeout("worker.execute(" + getter + "(), '" + eventName + "');", timeout);
		}
	this.error = function (message)
		{
			alert(message);
		}
		
// constructor
	
	// check prerrequisites
	if (typeof _Navigator === "undefined")
	{
		this.error('navigator.js script should be loaded!');
		return null;
	}
	if (typeof Styler === "undefined")
	{
		this.error('styler.js script should be loaded!');
		return null;
	}
	if (typeof Persistence === "undefined")
	{
		this.error('persistence.js script should be loaded!');
		return null;
	}
	
// attributes
	this.__navigator = new _Navigator();
	this.__navigatorhelper = new BloocruHelper();
	this.__styler = new Styler(this);
	this.__persistence = new Persistence(this);
	this.__provider = new BlooCruRulesHandler();
	this.initNode = null;
	
}

worker = new Worker();
