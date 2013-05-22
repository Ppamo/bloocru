
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
	}
	this.getPage = function()
		{
			this.initNode.innerHTML = '';
			this.initNode.appendChild(this.__navigator.getPage());
			return true;
		}
	this.execute = function(src, eventName)
		{
			if (eventName == null)
				eventName = 'click';
			return this.__navigator.execute(src, eventName);
		}
	this.executeAsync = function (label, eventName)
		{
			if (eventName == null)
				eventName = 'click';
			return this.__navigator.execute(this.initNode.firstChild, eventName);
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
	this.__styler = new Styler(this);
	this.__persistence = new Persistence(this);
	this.provider = new BlooCruRulesHandler();
	this.__mapper = new MapHelper(this);
	this.initNode = null;
	
}

worker = new Worker();
