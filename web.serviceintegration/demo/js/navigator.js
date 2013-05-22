
function _Navigator()
{

	// Attributes
	this.__initNode = null;
	this.areaCodes = new Array();
	this.areaCodes.push('init');
	this.areaCodes.push('profile');
	this.areaCodes.push('activities');
	this.areaCodes.push('events');
	this.areaCodes.push('people');
	this.area = this.areaCodes[0];
	this.holder = document.createElement('div');
	this.pageCodes = new Array();
	this.pageOnLoadLogic = new Array();
	// Constants
	// Page Code
	this.pageCodes.push(new Array('login', '<table class="loginControl"><tr><td>Ingrese su correo<br/>y contrase&ntilde;a:</td></tr><tr><td><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.loginInput" type="text" value="correo" class="loginLoginInput"></input></br><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.passwordInput" type="password" value="1234" class="loginPasswordInput"></input></td></tr><tr><td><input type="checkbox"></input> <span onclick="return worker.execute(this);" oname="login.rememberLabel" class="Rememberme">Recordarme</span></td></tr><tr><td>&nbsp;</td></tr><tr><td><div class="link" onclick="return worker.execute(this);" oname="login.access"><span>Acceder</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.area = 'init';
		}
		));
	this.pageCodes.push(new Array('locating', '<table oname=\'locating.locating\' class="locatingControl"><tr><td>Bienvenido</td></tr><tr><td><span id="name">Hugo</span>, te</td></tr><tr><td>estamos</td></tr><tr><td>localizando</td></tr><tr><td><img src="demo/img/loading.gif"/></td></tr></table>', 
		function()
		{
			setTimeout("worker.executeAsync(\'login.located\', \'timeout\');", 3000);
		}));
	this.pageCodes.push(new Array('located', '<table class="locatedControl"><tr><td><span class="text">Estas en </span><select oname="located.selector" onChange="return worker.execute(this, \'change\');"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="10" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="9" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td class="mapContainer"></td></tr><tr><td ><div class="link" oname="located.confirm" onClick="return worker.execute(this);" ><span>Confirmar</span></div></td></tr></table>',
		function()
		{
			worker.__mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		}));
	this.pageCodes.push(new Array('tips', '<table class="tipsControl"><tr><td><span class="text">Estas en </span><select oname="tips.selector" onChange="return worker.execute(this, \'change\');"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td><div class="tipsContainer"><table></table></div></td></tr><tr><td><div class="link" oname="tips.write" onclick="return worker.execute(this);"><span>Escribe</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.area = 'activities';
			worker.__navigator.bloocruhelper.createMenu();
			worker.__navigator.bloocruhelper.setLocationSelector(contentBody.firstChild.rows[0].cells[0].childNodes[1]);
			var data = worker.persistence.getTips();
			var node = worker.__navigator.bloocruhelper.getTipsControlFromData(data);
			worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(node);
		}));
	this.pageCodes.push(new Array('tip', '<table class="tipControl"><tr><td colspan="2"><div class="tipContainer"></div></td></tr><tr><td><div class="link" oname="tip.back" onclick="return worker.execute(this);"><span>Volver</span></div></td><td><div class="link" oname="tip.participants" onclick="return worker.execute(this);" ;><span>Asistentes</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
			var data = worker.persistence.getTip();
			var nodeCode = worker.__navigator.bloocruhelper.getTipControlFromData(data);
			var innerCode='<table><tr><th>' + nodeCode + '</th></tr>' +
					'<tr><td><span class="tip_user">Paco</span> dice <span class="tip_message">me anoto!</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Hugo</span> dice <span class="tip_message">excelente...</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Amet Magna</span> dice <span class="tip_message">sed porttitor venenatis mi et dignissim</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Massa</span> dice <span class="tip_message">in interdum est quis purus dignissim mattis</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Lorem</span> dice <span class="tip_message">vivamus placerat, dui a feugiat facilisis, risus lectus hendrerit quam</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Velit</span> dice <span class="tip_message">mauris dictum fermentum diam ac egestas</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Amet Magna</span> dice <span class="tip_message">sed porttitor venenatis mi et dignissim</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Massa</span> dice <span class="tip_message">in interdum est quis purus dignissim mattis</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Lorem</span> dice <span class="tip_message">vivamus placerat, dui a feugiat facilisis, risus lectus hendrerit quam</span> <span class="tip_time">hace un rato</span></td></tr>' +
					'<tr><td><span class="tip_user">Ipsum</span> dice <span class="tip_message">proin vel lacus a elit porta porta consequat eu ipsum</span> <span class="tip_time">hace un rato</span></td></tr>' +
				'</table>';
			worker.initNode.firstChild.rows[0].cells[0].firstChild.innerHTML = innerCode;
		}));
	this.pageCodes.push(new Array('tipJoin', '<table class="tipJoinControl"><tr><td colspan="2"><div class="tipJoinContainer"><table><tr><td class="icon" userId="1"><img src="demo/img/profiles/006.jpg" /></td><td><span class="tipJoinUser">Luis McPato</span></td></tr><tr><td class="icon" userId="3"><img src="demo/img/profiles/003.jpg" /></td><td><span class="tipJoinUser">Paco McPato</span></td></tr><tr><td class="icon" userId="1"><img src="demo/img/profiles/004.jpg" /></td><td><span class="tipJoinUser">Luis McPato Segundo</span></td></tr><tr><td class="icon" userId="3"><img src="demo/img/profiles/002.jpg" /></td><td><span class="tipJoinUser">Paco McPato Segundo</span></td></tr></table></div></td></tr><tr><td><div class="link" oname="tipJoin.back" onclick="return worker.execute(this);"><span>Volver</span></div></td><td><div class="link" oname="tip.join" onclick="return worker.execute(this);" joined="false" ;><span>Participar</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
		}));
	this.pageCodes.push(new Array('postTip', '<table class="tipPostControl"><tr><td colspan="3"><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="postTip.title" type="text" defaulttext="title" value="title"></input></td></tr><tr><td colspan="3"><textarea onfocus="return worker.execute(this, \'focus\');" onblur="worker.execute(this, \'blur\');" oname="postTip.description" defaulttext="description" >description</textarea></td></tr><tr><tr><td colspan="3">&nbsp;</td></tr><tr><td colspan="3">&nbsp;</td></tr><tr><td colspan="3">&nbsp;</td></tr><td><div class="link" onclick="return worker.execute(this);" oname="postTip.cancel"><span>Cancelar</span></div></td><td></td><td><div class="link" onclick="return worker.execute(this);" oname="postTip.post"><span>Postear</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
		}));
	this.pageCodes.push(new Array('profile', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="demo/img/profiles/006.jpg" /></td><td><span class="name">Hugo McPato</span><br/><span>Tripulante</span></br><span>31/10/1980<span></br><span>acepta engargos</span></td></tr><tr><td colspan="2">sobre mi...</td></tr><tr><td colspan="2"> Ut aliquet dui vel dolor convallis id fringilla nisl mollis. Praesent consectetur ipsum eget nulla congue eu hendrerit purus semper. Phasellus ornare molestie lectus, sit amet luctus est auctor malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sagittis felis laoreet nulla feugiat vulputate. Praesent id augue sed risus tincidunt congue sed ac ligula</td></tr></table></div></td></tr><tr><td><div class="link" oname="profile.return" onclick="return worker.execute(this);"><span>Volver</span></div></td><td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
		}));
	this.pageCodes.push(new Array('myprofile', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="demo/img/profiles/001.jpg" /></td><td><span class="name">Hugo McPato</span><br/><span>Tripulante</span></br><span>31/10/1980<span></br><span>acepta engargos</span></td></tr><tr><td colspan="2">sobre mi...</td></tr><tr><td colspan="2"> Ut aliquet dui vel dolor convallis id fringilla nisl mollis. Praesent consectetur ipsum eget nulla congue eu hendrerit purus semper. Phasellus ornare molestie lectus, sit amet luctus est auctor malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sagittis felis laoreet nulla feugiat vulputate. Praesent id augue sed risus tincidunt congue sed ac ligula</td></tr></table></div></td></tr><tr><td><div class="link" oname="myprofile.edit" onclick="return worker.execute(this);"><span>Editar</span></div></td><td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
		}));
	this.pageCodes.push(new Array('people', '<table class="peopleControl"><tr><td><div class="peopleControlContainer"><table><tr><td class="icon" userId="1"><img onclick="return worker.execute(this);" oname="people.avatar" src="demo/img/profiles/006.jpg" /></td><td><span class="peopleControlUser">Luis McPato</span><br/><span class="peopleControlUserConnected">conectado</span></td></tr><tr><td class="icon" userId="3"><img onclick="return worker.execute(this);" oname="people.avatar" src="demo/img/profiles/003.jpg" /></td><td><span class="peopleControlUser">Paco McPato</span><br/><span class="peopleControlUserBusy">ocupado</span></td></tr><tr><td class="icon" userId="1"><img onclick="return worker.execute(this);" oname="people.avatar" src="demo/img/profiles/004.jpg" /></td><td><span class="peopleControlUser">Luis McPato Segundo</span><br/><span class="peopleControlUserConnected">conectado</span></td></tr><tr><td class="icon" userId="3"><img onclick="return worker.execute(this);" oname="people.avatar" src="demo/img/profiles/002.jpg" /></td><td><span class="peopleControlUser">Paco McPato Segundo</span><br/><span class="peopleControlUserSleeping">durmiendo</span></td></tr></table></div></td></tr><tr><td><div class="link" oname="people.back" onclick="return worker.execute(this);"><span>Volver</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.area = 'people';
			worker.__navigator.bloocruhelper.createMenu();
		}));
	this.pageCodes.push(new Array('events', '<table class="eventsControl"><tr><td><span class="text">Estas en </span><select oname="events.selector" onChange="return worker.execute(this, \'change\');"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td><div class="eventsContainer"><table></table></div></td></tr><tr><td><div class="link" oname="tips.write" onclick="return worker.execute(this);"><span>Escribe</span></div></td></tr></table>',
		function()
		{
			worker.__navigator.area = 'events';
			worker.__navigator.bloocruhelper.createMenu();
			worker.__navigator.bloocruhelper.setLocationSelector(contentBody.firstChild.rows[0].cells[0].childNodes[1]);
			var data = worker.persistence.getEvents();
			var node = worker.__navigator.bloocruhelper.getEventsControlFromData(data);
			worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(node);
		}));
	this.pageCodes.push(new Array('postEvent', '<table class="PostControl"><tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr></table>',
		function()
		{
			worker.__navigator.bloocruhelper.createMenu();
			var innerCode='<table class="PostControl">' +
				'<tr><td colspan="2"></td></tr>' +
				'<tr><td colspan="2"></td></tr>' +
				'</table>';
			worker.initNode.innerHTML = innerCode;
			worker.__mapper.getMap(worker.initNode.firstChild.rows[0].cells[0]);
		
			var editForm='<table class="editForm">' + 
				'<tr><td colspan="2"><input defaultText="t&iacute;tulo" oname="post.titleinput" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this,\'blur\');" value="t&iacute;tulo" type="text" size="20" /></td></tr>' +
				'<tr><td colspan="2"><textarea defaultText="descripci&oacute;n" oname="post.descriptioninput" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this,\'blur\');" cols="16" rows="5">descripci&oacute;n</textarea></td></tr>' +
				'<tr><td><div class="link" oname="post.cancel" onclick="return worker.execute(this);" ><span>Cancelar</span></div></td><td><div class="link" oname="post.save" onclick="return worker.execute(this);" ><span>Publicar</span></div></td></tr></table>';


			gmapEditControl = new google.maps.InfoWindow({ content: editForm  });
			gmapEditMarker = new google.maps.Marker
				({
					position: worker.__mapper.gmap.getCenter(),
					map: worker.__mapper.gmap,
					title: 'Click to edit'
				});
			
			google.maps.event.addListener(worker.__mapper.gmap, 'click', function(e)
				{
					gmapEditMarker.setPosition(e.latLng);
				}
			);
			
			google.maps.event.addListener(gmapEditMarker, 'click', function()
				{
					gmapEditControl.open(worker.__mapper.gmap, gmapEditMarker);
				}
			);
		}));
	this.pageCodes.push(new Array('event', '<table class="EventControl"><tr><td></td></tr><tr><td></td></tr><tr><td><div class="link" oname="place.return" onClick="return worker.execute(this);"><span>Volver</span></div></td></tr></table>',
		function ()
		{
			worker.__navigator.bloocruhelper.createMenu();
			worker.__mapper.getMap(worker.initNode.firstChild.rows[0].cells[0]);
			gmapEditMarker = new google.maps.Marker
				({
					position: worker.__mapper.gmap.getCenter(),
					map: worker.__mapper.gmap,
					title: 'Click to see details'
				});
			worker.__mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		}));
	this.pageCodes.push(new Array('place', '<table class="PlaceControl"><tr><td></td></tr><tr><td></td></tr><tr><td><div class="link" oname="place.return" onClick="return worker.execute(this);"><span>Volver</span></div></td></tr></table>',
		function ()
		{
			worker.__navigator.bloocruhelper.createMenu();
			worker.__mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		}));
	this.pageCodes.push(new Array('menu', '<table class="PlaceControl"><tr><td></td></tr><tr><td></td></tr><tr><td><div class="link" oname="place.return" onClick="return worker.execute(this);"><span>Volver</span></div></td></tr></table>',
		function ()
		{
			worker.__navigator.bloocruhelper.createMenu();
			worker.__mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		}));
	
	
// Methods
	// get Page
	this.getPage = function ()
		{
			this.holder.innerHTML = this.currentPage[1];
			return this.holder.firstChild;
		}
	// setInitialNode
	this.setInitialNode = function (node)
		{
			this.__initNode = node;
		}
	// execute
	this.execute = function (src, eventName)
		{
			var nodeName = src.getAttribute('oname');
			var output;
			output = this.screenhelper.execute(src, eventName);
			if (output != null)
				return output;
			output = this.helper.execute(src, eventName);
			if (output != null)
				return output;
			
			alert('event not found ' + eventName + ': ' + nodeName);
			return false;
		}
	// navigate
	this.navigate = function (type, pageName)
		{
			switch (type)
			{
				case 'home':
					this.currentPage = this.homePage;
					this.__initNode.innerHTML = '';
					this.__initNode.appendChild(this.getPage());
					this.executeOnLoadLogic(this.currentPage);
					break;
				case 'page':
					var page = this.getPageCodes(pageName);
					if (page == null)
					{
						alert('page ' + pageName + ' not found!');
					}
					else
					{
						this.currentPage = page;
						this.__initNode.innerHTML = '';
						this.__initNode.appendChild(this.getPage());
						this.executeOnLoadLogic(this.currentPage);
					}
					break;
			}
			
		}
	// executeOnLoadLogic
	this.executeOnLoadLogic = function (value)
		{
			/*
			try
			{
				this.pageOnLoadLogic[value]();
			}
			catch(e)
			{
				return false;
			}
			*/
			if (this.currentPage[2] != null)
				this.currentPage[2]();
			return true;
		}
	// getPageCodes
	this.getPageCodes = function (name)
	{
		for (var i = 0; i<this.pageCodes.length; i++)
		{
			if (this.pageCodes[i][0] == name)
				return this.pageCodes[i];
		}
		return null;
	}
		
// Constructor
	this.homePage = this.getPageCodes('login');
	this.placeCode = 'scl';
	this.userId = 0;
	this.tipsMessageId = 0;
	this.helper = new NavigatorHelper(this);
	this.screenhelper = new NavigatorScreenHelper(this);
	this.bloocruhelper = new BloocruHelper(this);
	
}




