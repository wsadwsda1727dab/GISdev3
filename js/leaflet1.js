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
	
	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
	var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
		
	var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	var satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	
	
	var baseMaps = {
	    "灰度图": grayscale,
	    "街道图": streets,
		"卫星图":satellite,
		'Sputnik': L.tileLayer('http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png', {
			maxZoom: 18,attribution:"Sputnik Layer"}), 
		"CartoDB Positron": L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			maxZoom: 18}), 
		"OSM": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18}),
	};
	
	
	var ourlayer = L.geoJSON(null, {
		onEachFeature: onEachFeature
	}).addTo(map);
	$.ajax({
		url:'data/point.json',
		type:'get',
		dataType:'json',
		success:function(result){
			console.log(result);
			ourlayer.addData(result);
		}
	});
	
	// 遍历所有要素的指定属性，并绑定到弹出窗口
	function onEachFeature(feature, layer) {
	    // does this feature have a property named name?
	    if (feature.properties && feature.properties.name) {
	        layer.bindPopup(feature.properties.name);
	    }
	}
	
	
	var WuchangStyle = {
		"color": "#ff007f",
		"weight": 1,
		"opacity": 0.5
	};
	var Wuchang = L.geoJSON(null, {
		style: WuchangStyle
	});	
	$.ajax({
		url:'data/420106.json',
		type:'get',
		dataType:'json',
		success:function(result){
			console.log(result);
			Wuchang.addData(result);
		}
	});	
	var WuhanStyle = {
		"color": "#00aa00",    
		"weight": 3,    
		"opacity": 0.5     //透明度
	};
	
	var Wuhan = L.geoJSON(null, {
		style: WuhanStyle ,
		onEachFeature: onEachFeature
	});
	$.ajax({
		url:'data/420100.json',
		type:'get',   //请求类型
		dataType:'json',//返回数据类型
		success:function(result){
			console.log(result);
			//把获取到的json数据赋值给那个等数据的空图层
			Wuhan.addData(result);
		}
	});
	
	
	var Hubei = L.geoJSON(null, {
		onEachFeature: onEachFeature 
	});
	$.ajax({
		url:'data/420000.json',
		type:'get',
		dataType:'json',
		success:function(result){
			console.log(result);
			Hubei.addData(result);
		}
	});
	
	
	var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
	    layers: 'TOPO-WMS,OSM-Overlay-WMS'
	});
	var Hillshade = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
	    layers: 'SRTM30-Colored-Hillshade'
	});

	
	var ourlayers = {
		"武昌区":Wuchang,
		"武汉市":Wuhan,
		"湖北省":Hubei,
		"湖北大学":ourlayer,		
		"TOPO-OSM-WMS":wmsLayer,
		"Hillshade":Hillshade		
	};
	// 加载地图控件，可以切换底图
	var layerControl = L.control.layers(baseMaps, ourlayers).addTo(map);
	
	var searchControl = new L.Control.Search({
		layer:Hubei,
		propertyName: 'name',
		//搜索提示Tips
		textPlaceholder:'地图要素搜索...',  
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//定义放大并弹出属性窗口
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
			//放大缩放到定义图层
			map.setView(latlng, zoom); }
	});
		
	searchControl.on('search:locationfound', function(e) {
		//定义高亮样式
		e.layer.setStyle({fillColor: '#ff5500', color: '#ff557f'});
		if(e.layer._popup)
			e.layer.openPopup();
			//搜索回调函数
	}).on('search:collapsed', function(e) {
		//每个要素图层的样式响应函数
		featuresLayer.eachLayer(function(layer) {	//restore feature color
			//重新给要素图层设定样式
			featuresLayer.resetStyle(layer);
		});	
	});
	map.addControl( searchControl ); 
	
}