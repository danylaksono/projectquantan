//fungsi utama pemanggilan peta
function initMap() {
	
	//variables
	var geographic = new OpenLayers.Projection("EPSG:4326");
    var mercator = new OpenLayers.Projection("EPSG:900913");
	
	
	//map container
	map = new OpenLayers.Map("map",
		{projection: mercator},
		{controls: []}
		);
	
	//basemap
	var osm = new OpenLayers.Layer.OSM();
    map.addLayers([osm]);
	
	//wms
	wms = new OpenLayers.Layer.WMS("jaringanjalanwgs",
				"http://localhost:8080/geoserver/Projectkuantan/wms",	//change here
				{
					LAYERS: 'Projectkuantan:jaringanjalanwgs',			//and here
					STYLES: '',
					projection: geographic,
					transparent:true,
					tiled: true
				});
	
	map.addLayer(wms);
    
    // if you want to use Geographic coords, transform to ESPG:900913
    var bounds = new OpenLayers.Bounds(
                    101.2145252700034, -0.9550128489747423,
                    101.91875368039334, 0.0197563099999978
                );
    map.zoomToExtent(bounds.transform(geographic, mercator));
	
	var koordinat = new OpenLayers.Control.MousePosition();
	map.addControl(koordinat);
	
	
	//--------JS Method for layers------
	
	//#LayerJalan DOM 
	$("#layerJalan").prop('checked', true);
	
	function checkJalan () {
	if ($("#layerJalan").prop('checked')==true) {
        wms.setVisibility(true);
    } else {
        wms.setVisibility(false);
    }
	};
	$("#layerJalan").change(function event(){checkJalan()});
	
	
	
	//#Basemap DOM 
	$("#layerBackground").prop('checked', true);
	
	function checkBackground () {
	if ($("#layerBackground").prop('checked')==true) {
        osm.setVisibility(true);
    } else {
        osm.setVisibility(false);
    }
	};
	$("#layerBackground").change(function event(){checkBackground()});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}