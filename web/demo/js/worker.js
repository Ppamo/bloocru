
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
			this.__initNode = node;
			this.navigator.setInitialNode(this.__initNode);
		}
	this.getPage = function()
		{
			this.__initNode.innerHTML = '';
			this.__initNode.appendChild(this.navigator.getPage());
			return true;
		}
	this.execute = function(src, eventName)
		{
			if (eventName == null)
				eventName = 'click';
			
			
			// here will be only the in screen events
			var nodeName = src.getAttribute('oname');
			
			switch (nodeName)
			{
				case 'login.rememberLabel':
					break;
				case 'login.loginInput':
					switch (eventName)
					{
						case 'focus':			
							break;
						case 'blur':
							break;
					}
				case 'login.passwordInput':
					switch (eventName)
					{
						case 'focus':
							break;
						case 'blur':
							break;
					}
				default:
					this.navigator.execute(src);
			}
			return false;
		}
	this.error = function (message)
		{
			alert(message);
		}
		
// constructor
	
	// check prerrequisites
	if (typeof Navigator === "undefined")
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
	this.navigator = new Navigator();
	this.styler = new Styler();
	this.persistence = new Persistence();
	this.__initNode = null;
	
}

worker = new Worker();