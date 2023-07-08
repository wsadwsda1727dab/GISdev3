function init(){
	var map = L.map("map").setView([30.56486,114.353622 ], 10);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 12,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2t1M2UxNmd1NGV4ZDJwbzIzYWxoOGZlbiJ9.PYUoUFa8Twrx8GNhUq8Ydg'
	}).addTo(map);	
	var geoserver_river = L.geoJSON(null);
	$.ajax({
		url:'http://localhost:8080/geoserver/webgis/wms?service=WMS&version=1.1.0&request=GetMap&layers=webgis%3A%E5%8C%BA%E5%8E%BF&bbox=1.2384418585136421E7%2C3552525.4190306976%2C1.2718343884313252E7%2C3694119.0543522635&width=768&height=330&srs=EPSG%3A3857&styles=&format=application/openlayers',
		type:'get',
		dataType:'json',
		success:function(result){
			console.log(result);
			geoserver_river.addData(result);
		}
	});
	var Hubei = L.geoJSON(null);
	$.ajax({
		url:'data/420000.json',
		type:'get',
		dataType:'json',
		success:function(result){
			console.log(result);
			Hubei.addData(result);
		}
	});
	var mylayer = {
		"湖北":Hubei,
		"区县":geoserver_river
		
	};
	var layerControl = L.control.layers(mylayer).addTo(map);
	
	
}