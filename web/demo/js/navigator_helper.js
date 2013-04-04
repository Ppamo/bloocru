
function NavigatorHelper()
{
	this.execute = function (src, eventName, navigator)
		{
			var defaultReturnValue = false;
			var nodeName = src.getAttribute('oname');
			switch (navigator.area)
			{
				case 'init':
					switch (nodeName)
					{
						case 'login.access':
							navigator.navigate('page', 1);
							return defaultReturnValue;
							break;
						case 'locating.locating':
							navigator.navigate('page', 2);
							return defaultReturnValue;
							break;
						case 'located.confirm':
							navigator.navigate('page', 3);
							return defaultReturnValue;
							break;
					}
					break;
				case 'action': // action
					break;
				case 'people': // people
					break;
				case 'map': // map
					break;
			}
		};
}


function NavigatorScreenHelper()
{
// Methods
	this.execute = function (src, eventName, navigator)
		{
			var defaultReturnValue = false;
			var nodeName = src.getAttribute('oname');
			switch (nodeName)
			{
				case 'login.rememberLabel':
					var check=src.parentNode.firstChild;
					check.click();
					return defaultReturnValue;
					break;
				case 'login.loginInput':
					switch (eventName)
					{
						case 'focus':
							if (src.value=='correo')
							{
								src.value='';
								src.style.color='black';
							}
							return defaultReturnValue;
							break;
						case 'blur':
							if (src.value.length==0)
							{
								src.style.color='';
								src.value='correo';
							}
							return defaultReturnValue;
							break;
					}
					break;
				case 'login.passwordInput':
					switch (eventName)
					{
						case 'focus':
							if (src.value=='1234')
							{
								src.value='';
								src.style.color='black';
							}
							return defaultReturnValue;
							break;
						case 'blur':
							if (src.value.length==0)
							{
								src.style.color='';
								src.value='1234';
							}
							return defaultReturnValue;
							break;
					}
					break;
				case 'located.selector':
					switch (eventName)
					{
						case 'change':
							var selected=src.options[src.selectedIndex];
							var currentPlaceCode=selected.getAttribute('value');
							var lat=selected.getAttribute('lat');
							var lng=selected.getAttribute('lng');
							var zoom=parseInt(selected.getAttribute('zoom'));
							worker.mapper.setPosition(lat, lng, zoom);
							return defaultReturnValue;
							break
					}
					break;
			}
			return null;
		}
// Constructor

}


