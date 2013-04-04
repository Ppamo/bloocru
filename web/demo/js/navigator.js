
function Navigator()
{

	// Attributes
	this.__initNode = null;
	this.city = 'scl';
	this.user = 'Pablo';
	this.areaCodes = new Array();
	this.areaCodes[0] = 'init';
	this.areaCodes[1] = 'action';
	this.areaCodes[2] = 'people';
	this.areaCodes[3] = 'map';
	this.area = this.areaCodes[0];
	this.holder = document.createElement('div');
	this.pageCodes = new Array();
	
	// Constants
	this.pageCodes[0] = new Array('loginPage', '<table class="loginControl"><tr><td>Ingrese su correo<br/>y contrase&ntilde;a:</td></tr><tr><td><input onfocus="return worker.execute(this, \'focus\');" onblur="return worker.execute(this, \'blur\');" oname="login.loginInput" type="text" value="correo"></input></br><input onfocus="worker.execute(this, \'focus\');" onblur="worker.execute(this, \'blur\');" oname="login.passwordInput" type="password" value="1234"></input></td></tr><tr><td><input type="checkbox"></input> <span onclick="worker.execute(this);" oname="login.rememberLabel" class="Rememberme">Recordarme</span></td></tr><tr><td>&nbsp;</td></tr><tr><td><span class="link" onclick="return worker.execute(this);" oname="login.access">Acceder</span></td></tr></table>');
	this.pageCodes[1] = new Array('LocatingPage', '<table class="locatingControl"><tr><td>Bienvenido</td></tr><tr><td><span id="name">Hugo</span>, te</td></tr><tr><td>estamos</td></tr><tr><td>localizando</td></tr><tr><td><img src="img/loading.gif"/></td></tr></table>');
	this.pageCodes[2] = new Array('locatedPage', '<table class="locatedControl"><tr><td><span class="text">Estas en </span><select onChange="loadControl_Located_SelectorOnChange(this)"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="10" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="9" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td ></td></tr><tr><td ><span class="link" onClick="loadControl_Located_OnConfirm(this)" >Confirmar</span></td></tr></table>');
	this.pageCodes[3] = new Array('tipsPage', '<table class="tipsControl"><tr><td><span class="text">Estas en </span><select onChange="loadControl_Tips_SelectorOnChange(this)"><option zoom="10" lat="-33.440574" lng="-70.638056" value="scl">Santiago, Chile</option><option zoom="2" lat="-12.059466" lng="-77.064972" value="lpe">Lima, Peru</option><option zoom="10" lat="-34.603824" lng="-58.381348" value="baa">Buenos Aires, Argentina</option></select></td></tr><tr><td><div class="tipsContainer"><table></table></div></td></tr><tr><td><span class="link" onclick="loadControl_Tips_Write(this);">Escribe</span></td></tr></table>');
	this.pageCodes[4] = new Array('tipPage', '<table class="tipControl"><tr><td colspan="2"><div class="tipContainer"></div></td></tr><tr><td><span class="link" onclick="loadControl_Tip_ReturnOnClick(this);">Volver</span></td><td><span class="link" onclick="loadControl_Tip_ParticipantsOnClick(this)" ;>Asistentes</span></td></tr></table>');
	this.pageCodes[5] = new Array('tipJoinPage', '<table class="tipJoinControl"><tr><td colspan="2"><div class="tipJoinContainer"><table><tr><td class="icon" userId="1"><img src="img/profiles/006.jpg" /></td><td><span class="tipJoinUser">Luis McPato</span></td></tr><tr><td class="icon" userId="3"><img src="img/profiles/003.jpg" /></td><td><span class="tipJoinUser">Paco McPato</span></td></tr><tr><td class="icon" userId="1"><img src="img/profiles/004.jpg" /></td><td><span class="tipJoinUser">Luis McPato Segundo</span></td></tr><tr><td class="icon" userId="3"><img src="img/profiles/002.jpg" /></td><td><span class="tipJoinUser">Paco McPato Segundo</span></td></tr></table></div></td></tr><tr><td><span class="link" onclick="loadControl_TipJoin_ReturnOnClick(this);">Volver</span></td><td><span class="link" onclick="loadControl_TipJoin_ConfirmOnClick(this)" joined="false" ;>Participar</span></td></tr></table>');
	this.pageCodes[6] = new Array('profilePage', '<table class="ProfileControl"><tr><td><div class="ProfileContainer"><table><tr><td class="icon"><img src="img/profiles/006.jpg" /></td><td><span class="name">Hugo McPato</span><br/><span>Tripulante</span></br><span>31/10/1980<span></br><span>acepta engargos</span></td></tr><tr><td colspan="2">sobre mi...</td></tr><tr><td colspan="2"> Ut aliquet dui vel dolor convallis id fringilla nisl mollis. Praesent consectetur ipsum eget nulla congue eu hendrerit purus semper. Phasellus ornare molestie lectus, sit amet luctus est auctor malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi sagittis felis laoreet nulla feugiat vulputate. Praesent id augue sed risus tincidunt congue sed ac ligula</td></tr></table></div></td></tr><tr><td><span class="link" onclick="loadControl_Profile_ReturnOnClick(this);">Volver</span></td><td></tr></table>');
	this.pageCodes[7] = new Array('placePage', '<table class="PlaceControl"><tr><td></td></tr><tr><td></td></tr><tr><td><span class="link" onClick="loadControl_PlaceControl_ReturnOnClick(this)">Volver</span></td></tr></table>');
	this.pageCodes[8] = new Array('postPage', '<table class="PostControl"><tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr></table>');
	// this.pageCodes[] = {'', ''};
	this.currentPage = this.pageCodes[0];
	
	
// Methods
	this.getPage = function ()
		{
			this.holder.innerHTML = this.currentPage[1];
			return this.holder.firstChild;
		}
	this.setInitialNode = function (node)
		{
			this.__initNode = node;
		}
	this.execute = function (src)
		{
			var nodeName = src.getAttribute('oname');
			switch (this.area)
			{
				case this.areaCodes[0]: // init
						switch (nodeName)
						{
							case 'login.access':
								this.currentPage = this.pageCodes[1];
								this.__initNode.innerHTML = '';
								this.__initNode.appendChild(this.getPage());
								break;
						}
					break;
				case this.areaCodes[1]: // action
					break;
				case this.areaCodes[2]: // people
					break;
				case this.areaCodes[3]: // map
					break;
			}
		}
	this.executeAt = function (src, delay)
		{
			nodeName = src.getAttribute('oname');
			switch (this.area)
			{
				case this.areaCodes[0]: // init
						switch (nodeName)
						{
							case 'login.access':
								this.currentPage = this.pageCodes[1];
								this.__initNode.innerHTML = '';
								this.__initNode.appendChild(this.getPage());
								break;
						}
					break;
				case this.areaCodes[1]: // action
					break;
				case this.areaCodes[2]: // people
					break;
				case this.areaCodes[3]: // map
					break;
			}
		}
	// Constructor
	
}