
function Navigator()
{

	// Attributes
	this.__initNode = null;
	this.areaCodes = new Array();
	this.areaCodes[0] = 'init';
	this.areaCodes[1] = 'action';
	this.areaCodes[2] = 'people';
	this.areaCodes[3] = 'map';
	this.area = this.areaCodes[0];
	this.holder = document.createElement('div');
	this.pageCodes = new Array();
	this.pageOnLoadLogic = new Array();
	// Constants
	// Page Code
	this.pageCodes[0] = new Array('loginPage', '<table class="loginControl"><tr><td>Ingrese su correo<br/>y contrase&ntilde;a:</td></tr><tr><td><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.loginInput" type="text" value="correo"></input></br><input onfocus="worker.execute(this, \'focus\');" onblur="worker.execute(this, \'blur\');" oname="login.passwordInput" type="password" value="1234"></input></td></tr><tr><td><input type="checkbox"></input> <span onclick="worker.execute(this);" oname="login.rememberLabel" class="Rememberme">Recordarme</span></td></tr><tr><td>&nbsp;</td></tr><tr><td><div class="link" onclick="return worker.execute(this);" oname="login.access"><span>Acceder</span></div></td></tr></table>');
	this.pageCodes[1] = new Array('LocatingPage', '<table oname=\'locating.locating\' class="locatingControl"><tr><td>Bienvenido</td></tr><tr><td><span id="name">Hugo</span>, te</td></tr><tr><td>estamos</td></tr><tr><td>localizando</td></tr><tr><td><img src="img/loading.gif"/></td></tr></table>', 
		function()
		{
			setTimeout("worker.executeAsync(\'login.located\', \'timeout\');", 3000);
		});
	this.pageCodes[2] = new Array('locatedPage', '<table class="locatedControl"><tr><td><span class="text">Estas en </span><select oname="located.selector" onChange="return worker.execute(this, \'change\');"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="10" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="9" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td ></td></tr><tr><td ><div class="link" oname="located.confirm" onClick="return worker.execute(this);" ><span>Confirmar</span></div></td></tr></table>',
		function()
		{
			worker.mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		});
	this.pageCodes[3] = new Array('tipsPage', '<table class="tipsControl"><tr><td><span class="text">Estas en </span><select oname="tips.selector" onChange="return worker.execute(this, \'change\');"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td><div class="tipsContainer"><table></table></div></td></tr><tr><td><div class="link" oname="tips.write" onclick="return worker.execute(this);"><span>Escribe</span></div></td></tr></table>',
		function()
		{
			worker.navigator.bloocruhelper.setLocationSelector(contentBody.firstChild.rows[0].cells[0].childNodes[1]);
			var data = worker.persistence.getTips();
			var node = worker.navigator.bloocruhelper.getTipsControlFromData(data);
			worker.initNode.firstChild.rows[1].cells[0].firstChild.appendChild(node);
		});
	
	this.pageCodes[4] = new Array('tipPage', '<table class="tipControl"><tr><td colspan="2"><div class="tipContainer"></div></td></tr><tr><td><div class="link" oname="tip.back" onclick="return worker.execute(this);"><span>Volver</span></div></td><td><div class="link" oname="tip.participants" onclick="return worker.execute(this);" ;><span>Asistentes</span></div></td></tr></table>',
		function()
		{
			var data = worker.persistence.getTip();
			var nodeCode = worker.navigator.bloocruhelper.getTipControlFromData(data);
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
		});
	this.pageCodes[5] = new Array('tipJoinPage', '<table class="tipJoinControl"><tr><td colspan="2"><div class="tipJoinContainer"><table><tr><td class="icon" userId="1"><img src="img/profiles/006.jpg" /></td><td><span class="tipJoinUser">Luis McPato</span></td></tr><tr><td class="icon" userId="3"><img src="img/profiles/003.jpg" /></td><td><span class="tipJoinUser">Paco McPato</span></td></tr><tr><td class="icon" userId="1"><img src="img/profiles/004.jpg" /></td><td><span class="tipJoinUser">Luis McPato Segundo</span></td></tr><tr><td class="icon" userId="3"><img src="img/profiles/002.jpg" /></td><td><span class="tipJoinUser">Paco McPato Segundo</span></td></tr></table></div></td></tr><tr><td><div class="link" oname="tipJoin.back" onclick="return worker.execute(this);"><span>Volver</span></div></td><td><div class="link" oname="tip.join" onclick="return worker.execute(this);" joined="false" ;><span>Participar</span></div></td></tr></table>');
	this.pageCodes[6] = new Array('profilePage', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="img/profiles/006.jpg" /></td><td><span class="name">Hugo McPato</span><br/><span>Tripulante</span></br><span>31/10/1980<span></br><span>acepta engargos</span></td></tr><tr><td colspan="2">sobre mi...</td></tr><tr><td colspan="2"> Ut aliquet dui vel dolor convallis id fringilla nisl mollis. Praesent consectetur ipsum eget nulla congue eu hendrerit purus semper. Phasellus ornare molestie lectus, sit amet luctus est auctor malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sagittis felis laoreet nulla feugiat vulputate. Praesent id augue sed risus tincidunt congue sed ac ligula</td></tr></table></div></td></tr><tr><td><div class="link" oname="profile.return" onclick="return worker.execute(this);"><span>Volver</span></div></td><td></tr></table>');
	this.pageCodes[7] = new Array('placePage', '<table class="PlaceControl"><tr><td></td></tr><tr><td></td></tr><tr><td><div class="link" oname="place.return" onClick="return worker.execute(this);"><span>Volver</span></div></td></tr></table>',
		function ()
		{
			worker.mapper.getMap(worker.initNode.firstChild.rows[1].cells[0]);
		});
	this.pageCodes[8] = new Array('postPage', '<table class="PostControl"><tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr></table>',
		function()
		{
			var innerCode='<table class="PostControl">' +
				'<tr><td colspan="2"></td></tr>' +
				'<tr><td colspan="2"></td></tr>' +
				'</table>';
			worker.initNode.innerHTML = innerCode;
			worker.mapper.getMap(worker.initNode.firstChild.rows[0].cells[0]);
		
			var editForm='<table class="editForm">' + 
				'<tr><td colspan="2"><input defaultText="t&iacute;tulo" oname="post.titleinput" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this,\'blur\');" value="t&iacute;tulo" type="text" size="20" /></td></tr>' +
				'<tr><td colspan="2"><textarea defaultText="descripci&oacute;n" oname="post.descriptioninput" onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this,\'blur\');" cols="16" rows="5">descripci&oacute;n</textarea></td></tr>' +
				'<tr><td><div class="link" oname="post.cancel" onclick="return worker.execute(this);" ><span>Cancelar</span></div></td><td><div class="link" oname="post.save" onclick="return worker.execute(this);" ><span>Publicar</span></div></td></tr></table>';


			gmapEditControl = new google.maps.InfoWindow({ content: editForm  });
			gmapEditMarker = new google.maps.Marker
				({
					position: worker.mapper.gmap.getCenter(),
					map: worker.mapper.gmap,
					title: 'Click to edit'
				});
			
			google.maps.event.addListener(worker.mapper.gmap, 'click', function(e)
				{
					gmapEditMarker.setPosition(e.latLng);
				}
			);
			
			google.maps.event.addListener(gmapEditMarker, 'click', function()
				{
					gmapEditControl.open(worker.mapper.gmap, gmapEditMarker);
				}
			);


		});

	
	
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
	this.navigate = function (type, value)
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
					this.currentPage = this.pageCodes[value];
					this.__initNode.innerHTML = '';
					this.__initNode.appendChild(this.getPage());
					this.executeOnLoadLogic(this.currentPage);
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
		
// Constructor
	this.homePage = this.pageCodes[0];
	this.placeCode = 'scl';
	this.userId = 0;
	this.tipsMessageId = 0;
	this.helper = new NavigatorHelper(this);
	this.screenhelper = new NavigatorScreenHelper(this);
	this.bloocruhelper = new BloocruHelper(this);
	
}




