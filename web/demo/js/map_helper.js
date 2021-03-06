
function MapHelper(worker)
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
	
// methods
	this.getMap = function (node)
		{
			if (node == null) return false;
				
			if (this.gmapCanvas == null)
			{
				this.gmapCanvas = document.createElement('div');
				this.gmapCanvas.setAttribute('id', 'gmapcanvas');
				this.gmapCanvas.setAttribute('class', 'gmapcanvas');
			}
			
			this.showMap();
			node.appendChild(this.gmapCanvas);
			this.gmap = new google.maps.Map(this.gmapCanvas, this.defaultMapOptions);
			return true;
		}
	this.showMap = function ()
		{
			this.gmapCanvas.setAttribute('class', 'gmapcanvas');
			return true;
		}
	this.hideMap = function ()
		{
			this.gmapCanvas.setAttribute('class', 'gmapcanvashidden');
			return true;
		}
	this.setPosition = function(lat, lng, zoom)
		{
			var latlng=new google.maps.LatLng(lat,lng);
			this.gmap.panTo(latlng);
			this.gmap.setCenter(latlng);
			this.gmap.setZoom(zoom);
			return true;
		}
	
// Constructor
	this.worker = worker;

}
