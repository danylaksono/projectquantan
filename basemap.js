//fungsi utama pemanggilan peta
function initMap() {
	
	//variables
	var geographic = new OpenLayers.Projection("EPSG:4326");
    var mercator = new OpenLayers.Projection("EPSG:900913");
	
	
	//map container
	map = new OpenLayers.Map("map",
		{projection: mercator,
		displayProjection: geographic},
		{controls: []}
		);
	
	//basemap
	var osm = new OpenLayers.Layer.OSM();
    map.addLayers([osm]);
	
	//map.addControl(new OpenLayers.Control.PanZoomBar());   //diaktifkan lagi kalau sudah waktunya
	map.addControl(new OpenLayers.Control.MousePosition());
	
	//wms
	jalanwms = new OpenLayers.Layer.WMS("jaringanJalan84",
				"http://localhost:8080/geoserver/Quansing/wms",	//change here
				{
					LAYERS: 'Quansing:jaringanJalan84',			//and here
					STYLES: '',
					projection: geographic,
					transparent:true,
					tiled: true
				});
	
	map.addLayer(jalanwms);
	
	var jalan = new OpenLayers.Layer.Vector("Jalan", {
                strategies:[
        new OpenLayers.Strategy.BBOX(),
        new OpenLayers.Strategy.Save()],
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.0.0",
                    url: "http://localhost:8080/geoserver/Quansing/wfs",
                    featureType: "Jalan"
                })
            });
					
            map.addLayer(jalan);
			
	

	//panel
	var panel = new EditingPanel(jalan);
	map.addControl(panel);
		
    
    // On the fly reprojection
    var bounds = new OpenLayers.Bounds(
                    101.2145252700034, -0.9550128489747423,
                    101.91875368039334, 0.0197563099999978
                );
    map.zoomToExtent(bounds.transform(geographic, mercator));
	
	var koordinat = new OpenLayers.Control.MousePosition();
	map.addControl(koordinat);
	
	

	//Drawing
	var draw = new OpenLayers.Control.DrawFeature(
    jalan, OpenLayers.Handler.Path);
    map.addControl(draw);
	
	function toggle() {
    if (document.getElementById("toggle-id").checked) {
        draw.activate();
    } else {
        draw.deactivate();
    }
	}
	document.getElementById("toggle-id").onclick = toggle;
	toggle();


	//--------Featureinfo
	
	/*info = new OpenLayers.Control.WMSGetFeatureInfo({
            url: 'http://localhost:8080/geoserver/Quansing/wfs', 
            title: 'Identify features by clicking',
            queryVisible: true,
            eventListeners: {
                getfeatureinfo: function(event) {
                    map.addPopup(new OpenLayers.Popup.FramedCloud(
                        "chicken", 
                        map.getLonLatFromPixel(event.xy),
                        null,
                        event.text,
                        null,
                        true
                    ));
                }
            }
        });
        map.addControl(info);
        info.activate();
			
            map.addControl(new OpenLayers.Control.MousePosition());
			
	*/
	//--------JS Method for layers------
	
	//#LayerJalan DOM 
	$("#layerJalan").prop('checked', true);
	
	function checkJalan () {
	if ($("#layerJalan").prop('checked')==true) {
        jalanwms.setVisibility(true);
    } else {
        jalanwms.setVisibility(false);
    }
	};
	$("#layerJalan").change(function event(){checkJalan()});
	
	
	//#LayerKuansingkab DOM 
	$("#layerAdmin").prop('checked', true);
	
	function checkKab () {
	if ($("#layerAdmin").prop('checked')==true) {
        kabwms.setVisibility(true);
    } else {
        kabwms.setVisibility(false);
    }
	};
	$("#layerAdmin").change(function event(){checkKab()});
	
	
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
	
	
    //Drawing
	draw = new OpenLayers.Control.DrawFeature(
    buildings, OpenLayers.Handler.Polygon);
    map.addControl(draw);
	
	function toggle() {
    if (document.getElementById("toggle-id").checked) {
        draw.activate();
    } else {
        draw.deactivate();
    }}
    document.getElementById("toggle-id").onclick = toggle;
    toggle();	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}