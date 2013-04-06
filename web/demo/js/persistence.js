
// For this version only hardcoded data
function Persistence(worker)
{

// Methods
	this.getTip = function()
		{
			return this.dataholder.getTip(this.worker.navigator.tipsMessageId);
		}
	this.getTips = function()
		{
			return this.dataholder.getTips(this.worker.navigator.placeCode);
		}
	
// Construtor
	this.worker = worker;
	this.dataholder = new dataHolder();
}

	/* * * * * * * * * * * * * * */
	/* * * * * * * * * * * * * * */

function dataHolder()
{

// Methods
	this.getTip = function(messageId)
		{
			for (var i = 0; i<this.tipData.length; i++)
			{
				if (this.tipData[i][7] == messageId)
					return this.tipData[i];
			}
			return null;
		}
	this.getTips = function(placeCode)
		{
			var output = new Array();
			switch (placeCode)
			{
				case 'scl':
					output.push(this.tipData[0]);
					output.push(this.tipData[1]);
					output.push(this.tipData[2]);
					output.push(this.tipData[3]);
					output.push(this.tipData[10]);
					output.push(this.tipData[11]);
					output.push(this.tipData[12]);
					break;
				case 'lpe':
					output.push(this.tipData[4]);
					output.push(this.tipData[5]);
					output.push(this.tipData[6]);
					output.push(this.tipData[13]);
					output.push(this.tipData[14]);
					output.push(this.tipData[15]);
					output.push(this.tipData[16]);
					break;
				case 'baa':
					output.push(this.tipData[7]);
					output.push(this.tipData[8]);
					output.push(this.tipData[9]);
					output.push(this.tipData[17]);
					output.push(this.tipData[18]);
					output.push(this.tipData[19]);
					break;
			}
			return output;
		}

// Attributes
	this.tipData = new Array();
	// Format: userId, userName, lat, lgn, zoom, placeName, msgTime, msgId, msg 
	// SCL
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'mall plaza norte', 1234, 1, 'Nos juntamos para ir al cine a ls 8pm en recepci&oacute;n'));
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'plaza baquedano', 1234, 2, 'juntemonos aca para ir bellavista en la noche'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'aeropuerto de santiago', 1234, 3, 'donde nos juntamos?'));
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'plaza de armas santiago', 1234, 4, 'vamos de shopping al centro'));
	// LPE
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'plaza de acho', 1234, 5, 'hay corrida de toros ma&ntilde;ana'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'plaza san martin', 1234, 6, 'damos una vuelta por la plaza'));
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'country club lima hotel', 1234, 7, 'juntemonos en recepci&oacute;n'));
	// BAA
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'parque francia', 1234, 8, 'vamos a dar una vuelta al parque...'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'librer&uacute;a liberarte', 1234, 9, 'juntemonos en el centro'));
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'estaci&oacute;n retiro', 1234, 10, 'damos una vuelta por puerto madero?'));
	// SCL
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'nam congue', 1234, 11, 'ipsum et porttitor viverra'));
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'pellentesque', 1234, 12, 'nunc risus mollis lectus'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'dui congue accumsan', 1234, 13, 'et tristique diam lorem posuere turpis'));
	// LPE
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'tortor', 1234, 14, 'sed tempor nisi nec, aliquet quis massa'));
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'nam vitae tortor', 1234, 15, 'hendrerit tempus laoreet vitae'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'ut nibh ante', 1234, 16, 'phasellus accumsan convallis faucibus'));
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'class aptent', 1234, 17, 'taciti sociosqu ad litora torquent per conubia nostra'));
	// BAA
	this.tipData.push(new Array(1, 'Hugo', 0, 0, 0, 'per inceptos himenaeos', 1234, 18, 'Sed tristique erat at felis volutpat tempor'));
	this.tipData.push(new Array(2, 'Paco', 0, 0, 0, 'nulla lacus arcu', 1234, 19, 'congue eget ultricies sit amet, convallis ut nibh'));
	this.tipData.push(new Array(3, 'Luis', 0, 0, 0, 'posuere varius libero', 1234, 20, 'Nunc non urna odio, sed porttitor orci'));

}