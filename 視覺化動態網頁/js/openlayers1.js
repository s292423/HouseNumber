function reqListener (result) {
    //把string變成object
    var obj = JSON.parse(result);
    //console.log(obj);
    
    //vectorSource.clear(true);
    // /* 定位現在位置，並在地圖上顯示 */
    // var output = document.getElementById("out");
    // if (!navigator.geolocation) {
    //     alert("請務必開啟手機GPS,並允許瀏覽器存取您的位置!");
    //     return;
    // }
    // function success(position) {
    //     latitude = position.coords.latitude;
    //     longitude = position.coords.longitude;
    //     console.log(latitude, longitude);
    //     map.getView().setCenter(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
    //     map.getView().setZoom(13);
    // }
    // function error() {
    //     alert("請開啟定位後重新整理!");
    // };
    // navigator.geolocation.getCurrentPosition(success, error);
    // var MyLocation = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');
    
    /* 一些地圖上設定的東西 */
    // $.ajax({url: url, success: function(result){

    //     //manually remove features from the source
    //     selectedLayerSource.forEachFeature(function(feature){
    //         selectedLayerSource.removeFeature(feature);
    //     });

    //     //create features from AJAX results
    //     var features = format.readFeatures(result, {
    //         featureProjection: 'EPSG:3857'
    //     });

    //     //add features to the source
    //     selectedLayerSource.addFeatures(features);

    // }}); 
    
    
    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var features = (new ol.format.GeoJSON()).readFeatures(obj, {
        featureProjection: 'EPSG:3857'
    });
    var vectorSource = new ol.source.Vector({
        features: features
    });

    if(vectorSource != null){
        console.log("clear");
        vectorSource.forEachFeature(function(feature){
            vectorSource.removeFeature(feature);
        });
    }

 


    vectorSource.addFeatures(features);

    
    var clusterSource = new ol.source.Cluster({
        distance: parseInt(40, 10),
        source: vectorSource
    });
    var styleCache = {};

   
    var vectorLayer = new ol.layer.Vector({
        source: clusterSource,
        style: function (feature) {
            var size = feature.get('features').length;
            //console.log(size);
            var style = styleCache[size];
            if(size==1){
                feature.setStyle(typeitems(feature));
            }else if (size>1){
                if (!style) {
                    style = new ol.style.Style({
                      image: new ol.style.Circle({
                        radius: 10,
                        stroke: new ol.style.Stroke({
                          color: '#fff'
                        }),
                        fill: new ol.style.Fill({
                          color: '#3399CC'
                        })
                      }),
                      text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                          color: '#fff'
                        })
                      })
                    });
                    styleCache[size] = style;
                }
                return style;
            }
            //feature.setStyle(typeitems(feature));
        }
    });

    /* 各種type判斷 */
    function typeitems(feature){
        if (feature.get('has_type')=='1'){
            return typestyle.typeone;
        }else if (feature.get('has_type')=='2'){
            return typestyle.typetwo;
        }else if (feature.get('has_type')=='3'){
            return typestyle.typethree;
        }else if (feature.get('has_type')=='4'){
            return typestyle.typefour;
        }else if (feature.get('has_type')=='5'){
            return typestyle.typefive;
        }else if (feature.get('has_type')=='6'){
            return typestyle.typesix;
        }else if (feature.get('has_type')=='7'){
            return typestyle.typeseven;
        }
    }

    /* 各種type設定顏色 */
    var typestyle = {
        typeone:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/red.png'
                }))
            })  
        ],
        typetwo:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/orange.png'
                }))
            })  
        ],
        typethree:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/yellow.png'
                }))
            })  
        ],
        typefour:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/green.png'
                }))
            })  
        ],
        typefive:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/blue.png'
                }))
            })  
        ],
        typesix:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/indigo.png'
                }))
            })  
        ],
        typeseven:[
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.6, 1],
                    anchorOrigin: 'bottom-center',
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.75,
                    src: './img/purple.png'
                }))
            })  
        ],
    }

    /* 地圖設定顯示 */
    var map = new ol.Map({
        target: 'map',
        layers: [osm, vectorLayer],
        controls: ol.control.defaults({
            attribution : false,
            zoom : false,
        }),
        view: new ol.View({
            center: ol.proj.transform([120.946727, 23.793028], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7.95
        })
    });

    /* 點選tag出現的info框框 */
    click_info(map);
}
/* 點選tag出現的info框框 */
function click_info(map){
    var container = document.getElementById('popup');  // 顯示的框框
    var content = document.getElementById('popup-content'); //框框裡的小框框紀錄文字內容
    var closer = document.getElementById('popup-closer');  //右上角的關閉

    //宣告overlay為變數，紀錄關於他的屬性]
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    //替map上加一層名為overlay之圖層以供顯示
    map.addOverlay(overlay);

    //觸發popup關閉事件
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    //觸發點擊圖標事件
    map.on('click', function(evt) {
        //取得feature，提供內容顯示需求
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
        //     return feature;
        // });
        // if(feature){
        //     //透過以下兩行取得feature位置，為 X , Y座標
        //     var geometry = feature.getGeometry();
        //     var coord = geometry.getCoordinates();
        //     //取得feature屬性
        //     var address = feature.get('address');
        //     address = address.substr(28);
        //     var type = feature.get('has_type');
        //     var Stime = feature.get('has_STime');
        //     //console.log(feature);
        //     //設定popup出現的位置，可透過popup.css第一行的bottom做上下調整
        //     overlay.setPosition(coord);
        //     //console.log(address);
        //     //寫進popup的內容框框裡

        //     content.innerHTML = "----地址資訊---- <br />"+address+"<br />"+"變更型態："+type+"<br / >"+"起始時間："+Stime;
        //}
            if (feature) {
                var coord = map.getCoordinateFromPixel(evt.pixel);
                if (typeof feature.get('features') === 'undefined') {
                    content.innerHTML = '<h5><b>' + feature.get('name') + '</b></h5><i>this is an <b>unclustered</b> feature</i>';
                } else {
                    var cfeatures = feature.get('features');
                    console.log(cfeatures);
                    if (cfeatures.length > 1) {
                        $(content).html("");
                        for (var i = 0; i < cfeatures.length; i++) {
                            var address = cfeatures[i].get('address');
                            address = address.substr(28);
                            var type = cfeatures[i].get('has_type');
                            //console.log(type);
                            var Stime = cfeatures[i].get('has_STime');
                            //content.innerHTML ="<b> ----地址"+(i+1)+"資訊---- </b><br />"+'<article>' + address +"<br />"+"變更型態："+type+"<br / >"+"起始時間："+Stime +'</article>';
                            $(content).append("<b> ----地址"+(i+1)+"資訊---- </b><br />");
                            $(content).append('<article>' + address +"<br />"+"變更型態："+type+"<br / >"+"起始時間："+Stime +'</article>');
                        }
                    }
                    if (cfeatures.length == 1) {
                        content.innerHTML = '<h5><strong>' + cfeatures[0].get('name') + '</strong></h5><i>this is a single, but <b>clustered</b> feature</i>';
                    }
                }
                overlay.setPosition(coord);
            } else {
                overlay.setPosition(undefined);
            }
        });
    });
}
