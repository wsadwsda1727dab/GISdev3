function into(){
		var map = new BMapGL.Map('l-map'); // 创建Map实例
		map.centerAndZoom(new BMapGL.Point(114.31791,30.548469), 13); // 初始化地图,设置中心点坐标和地图级别
		map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
};