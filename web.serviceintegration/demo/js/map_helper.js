
function GMAPHelper()
{
// attributes
	this.gmapCurrentZoom = 10;
	this.defaultMapOptions = 
		{
			center: new google.maps.LatLng(-33.440574,-70.638056), // SCL
			zoom: this.gmapCurrentZoom,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	this.gmapCanvas = null;
	GMAPHelper.container = null;
	GMAPHelper.internalContainer = document.createElement('div');
	GMAPHelper.internalContainer.setAttribute('class', 'gmapcanvas');
	
// methods
	// getMap
	this.getMap = function (node)
		{
			GMAPHelper.debug('getMap(' + node + ')');
			if (node == null)
				return false;
			GMAPHelper.container = node;
				
			if (GmapHelper.gmapCanvas == null)
			{
				GmapHelper.gmapCanvas = document.createElement('div');
				GmapHelper.gmapCanvas.setAttribute('id', 'gmapcanvas');
				GmapHelper.gmapCanvas.setAttribute('class', 'gmapcanvas');
			}

			node.appendChild(GmapHelper.gmapCanvas);
			GmapHelper.showMap();
			
			GMAPHelper.debug('generating new map!!');
			this.gmap = new google.maps.Map(GmapHelper.gmapCanvas, GmapHelper.defaultMapOptions);
			this.gmapCanvas.style.height = '100%';

			return true;
		}
	// showMap
	this.showMap = function ()
		{
			GMAPHelper.debug('showMap()');
			GmapHelper.gmapCanvas.setAttribute('class', 'gmapcanvas');
			return true;
		}
	// hideMap
	this.hideMap = function ()
		{
			GMAPHelper.debug('hideMap()');
			GMAPHelper.container.appendChild(GmapHelper.gmapCanvas);
			GmapHelper.gmapCanvas.setAttribute('class', 'gmapcanvashidden');
			return true;
		}
	// setPosition
	this.setPosition = function(lat, lng, zoom)
		{
			GMAPHelper.debug('setPosition(' + lat + ', ' + lng + ', ' + zoom + ')');
			var latlng=new google.maps.LatLng(lat,lng);
			GmapHelper.gmap.panTo(latlng);
			GmapHelper.gmap.setCenter(latlng);
			GmapHelper.gmap.setZoom(zoom);
			return true;
		}
	// localize
	this.localize = function(code)
		{
			GMAPHelper.debug('localize (' + code + ')');
			if (window.navigator.geolocation)
				window.navigator.geolocation.getCurrentPosition(
					function(position)
					{
						GMAPHelper.coords = position.coords;
						if (code != null) code(position);
					});
			else
				code(null);
		}
	// createMark
	this.createMark = function(lat, lng, zoom, title, form)
		{
			GMAPHelper.debug('createMark (' + lat + ', ' + lng + ', ' + zoom + ', ' + title + ', ' + ((form == null) ? 'null' : '[Code]'));
			
			var latlng = new google.maps.LatLng(lat,lng);
			GmapHelper.gmap.panTo(latlng);
			GmapHelper.gmap.setCenter(latlng);
			GmapHelper.gmap.setZoom(zoom);
			
			var mark = new google.maps.Marker
			({
				position: latlng,
				map: GmapHelper.gmap,
				title: title
			});
			
			// store the mark
			var infoWindow = null;
			if (form != null)
			{
				var infoWindow = new google.maps.InfoWindow({ content: form  });
				google.maps.event.addListener(mark, 'click', function() { GMAPHelper.HandleMarkOnClick(this); });
			}
			var index = this.storeMark(mark, infoWindow, zoom);
			mark.set('markIndex', index);
			return mark;
		}
	this.storeMark = function (mark, form, zoom)
		{
			GMAPHelper.marks.push(new Array(mark, form, zoom));
			return GMAPHelper.marks.length - 1;
		}
	this.removeMarkAt = function (index)
		{
			GMAPHelper.marks[index] = null;
		}
	// AddClickMark
	this.AddClickMark = function(title, form)
		{
			GMAPHelper.debug('AddClickMark(' + title + ', ' + ((form == null) ? 'null' : '[Code]') + ')');
			if (this.addMark == null)
			{
				this.addMark = new google.maps.Marker
				({
					position: GmapHelper.gmap.getCenter(),
					map: GmapHelper.gmap,
					title: title,
					icon: 'demo/img/GMap/003.png'
				});
				this.addMarkListener = google.maps.event.addListener(GmapHelper.gmap, 'click', function(e)
				{
					GmapHelper.addMark.setPosition(e.latLng);
				});
				if (form != null)
				{
					this.form = new google.maps.InfoWindow({ content: form  });
					this.form.open(this.gmap, this.addMark);
					// since a form will be open I'll disable some behaviors of the map
					// this.gmap.setOptions({draggable: false});
				}
				
			}
		}
	this.RemoveClickMark = function()
		{
			GMAPHelper.debug('RemoveClickMark()');
			// enable some maps behaviors
			// this.gmap.setOptions({draggable: true});
			this.addMark.setMap(null);
			google.maps.event.removeListener(this.addMarkListener);
			this.addMark = null;
			this.addMarkListener = null;
		}
	this.loadPlaces = function(data)
		{
			GMAPHelper.debug('loadPlaces(' + data + ')');
			if (data != null)
				// this.createMark = function(lat, lng, zoom, title, form)
				for (var i = 0; i < data.length; i++)
					this.createMark(data[i].latitude, data[i].longitude, data[i].zoom, data[i].label, data[i].form);
		}
	GMAPHelper.HandleMarkOnClick = function(src)
		{
			if (GMAPHelper.marks[GMAPHelper.markOpen] != null)
				if (GMAPHelper.marks[GMAPHelper.markOpen][1] != null)
					GMAPHelper.marks[GMAPHelper.markOpen][1].close();
			var index = src.get('markIndex');
			mark = GMAPHelper.marks[index][0];
			info = GMAPHelper.marks[index][1];
			zoom = GMAPHelper.marks[index][2];
			GmapHelper.gmap.panTo(mark.getPosition());
			info.open(GmapHelper.gmap, src);
			GMAPHelper.markOpen = index;
		}
		
	// LOGGER
	GMAPHelper.debug = function (message)
		{
			if (GMAPHelper.debugEnabled)
				GMAPHelper.log("debug: " + message);
		}
	GMAPHelper.error = function (message, error)
		{
			GMAPHelper.log("error: " + message);
			GMAPHelper.log(GMAPHelper.toNodeString(error));
		}		
	GMAPHelper.log = function (message)
		{
			if (GMAPHelper.logger.length > GMAPHelper.maxLogSize)
				GMAPHelper.logger.pop();
			GMAPHelper.logger.unshift(GMAPHelper.getFormatedDate() + " - " + message);
		}
	GMAPHelper.getDate = function()
		{
			return new Date().getTime() - GMAPHelper.syncDateOffSet;
		}
	GMAPHelper.getFormatedDate = function()
		{
			var date = new Date(new Date().getTime() - GMAPHelper.syncDateOffSet);
			var month = ((date.getMonth() < 10) ? '0' : '') + (date.getMonth() + 1) ;
			var day = ((date.getDate() < 10) ? '0' : '') + date.getDate();
			var milliseconds = date.getMilliseconds().toString();
			milliseconds = (milliseconds.length == 1) ? '00' + milliseconds : milliseconds ;
			milliseconds = (milliseconds.length == 2) ? '0' + milliseconds : milliseconds ;
			
			var formated = date.getFullYear() + '.' + month + '.' + day + ' ' + date.toTimeString().substr(0,8)  + ',' + milliseconds;
			return formated;
		}
	GMAPHelper.setDate = function(timestamp)
		{
			GMAPHelper.syncDate = new Date(Number(timestamp));
			GMAPHelper.syncDateOffSet = new Date().getTime() - Number(timestamp);
			GMAPHelper.timestamp = GMAPHelper.syncDate.getTime();
			GMAPHelper.debug('sync: ' + GMAPHelper.timestamp + ' - ' + GMAPHelper.syncDate + ' - offset: ' + GMAPHelper.syncDateOffSet);
			GMAPHelper.isSync = true;
		}
	GMAPHelper.debugEnabled = true;
	GMAPHelper.logger = new Array();
	GMAPHelper.syncDate = new Date();
	GMAPHelper.syncDateOffSet = 0;
	GMAPHelper.maxLogSize = 30;
	GMAPHelper.isSync = false;
	GMAPHelper.timestamp = GMAPHelper.syncDate.getTime();
	GMAPHelper.marks = new Array();
	GMAPHelper.markOpen = -1;
	
// Constructor
	this.gmapCanvas	= null;
	this.addMark = null;
	this.form = null;
	GMAPHelper.coords = null;
	
}
var GmapHelper = new GMAPHelper();

