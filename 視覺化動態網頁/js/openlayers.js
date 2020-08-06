var map=undefined;
var vectorSource=undefined;

/* -----各種type設定顏色----- */
// var typestyle = {
//     typeone:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/red.png'
//             }))
//         })  
//     ],
//     typetwo:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/orange.png'
//             }))
//         })  
//     ],
//     typethree:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/yellow.png'
//             }))
//         })  
//     ],
//     typefour:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/green.png'
//             }))
//         })  
//     ],
//     typefive:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/blue.png'
//             }))
//         })  
//     ],
//     typesix:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/indigo.png'
//             }))
//         })  
//     ],
//     typeseven:[
//         new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.6, 1],
//                 anchorOrigin: 'bottom-center',
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'fraction',
//                 opacity: 0.75,
//                 src: './img/purple.png'
//             }))
//         })  
//     ],
// }
/* -----載入geojson的feature----- */
    function loadFeatureFromObj(obj){
    var features = (new ol.format.GeoJSON()).readFeatures(obj, {
        featureProjection: 'EPSG:3857'
    });
    return features;
    }


    function initMap(position){
    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
  
  /* 一開始給空的features */
    var obj={"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"EPSG:4326"}},"features":[]};
  
  /* -----各鄉鎮縣市的geojson----- */
    vSource3 = new ol.source.Vector({
        url: './100_103_mapcode.geojson',
        format: new ol.format.GeoJSON()
    });	
    vectorLayer3 = new ol.layer.Vector({
        source: vSource3,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255,255,255, 0]
            }),
            stroke: new ol.style.Stroke({
                color: '#888888',width: 1})
            })
    });	
    currentLayer=vectorLayer3; //現在圖層

    vectorSource = new ol.source.Vector({
        features: loadFeatureFromObj(obj)
    });
  /* -----地圖上群集功能----- */
    var clusterSource = new ol.source.Cluster({
        distance: parseInt(40, 10),
        source: vectorSource
    });

    var styleCache = {};
 
    var clusterLayer = new ol.layer.AnimatedCluster({	
        name: 'Cluster',
        source: clusterSource,
        animationDuration: 700,
        // Use a style function for cluster symbolisation
        style: function (feature) {
            var size = feature.get('features').length;
                var style = styleCache[size];
                if (!style){	
                    var color = size>3000 ? "255,0,0" : size>800 ? "247,80,0" : size>100 ? "255,146,36" : size>50 ? "255,211,6": "130,217,0";
                    var radius = Math.max(8, Math.min(8*0.75, 20));
                    // var dash = 2*Math.PI*radius/6;
                    // var dash = [ 0, dash, dash, dash, dash, dash, dash ];
                    style = styleCache[size] = new ol.style.Style(
                        {	image: new ol.style.Circle(
                            {	radius: radius,
                                stroke: new ol.style.Stroke(
                                {	color: "rgba("+color+",0.5)", 
                                    width: 15 ,
                                    //lineDash: dash,
                                    lineCap: "butt"
                                }),
                                fill: new ol.style.Fill(
                                {	color:"rgba("+color+",1)"
                                })
                            }),
                            text: new ol.style.Text(
                            {	text: size.toString(),
                                fill: new ol.style.Fill(
                                {	color: '#fff'
                                })
                            })
                        });
                }
            return [style];
        }
    });
//   var vectorLayer = new ol.layer.Vector({
//       source: clusterSource,
//       style: function (feature) {
//           var size = feature.get('features').length;
//           //console.log(size);
//           var style = styleCache[size];
//           if(size==1){
//               feature.setStyle(typeitems(feature));
//           }else if (size>1){
//               if (!style) {
//                   style = new ol.style.Style({
//                     image: new ol.style.Circle({
//                       radius: 10,
//                       stroke: new ol.style.Stroke({
//                         color: '#fff'
//                       }),
//                       fill: new ol.style.Fill({
//                         color: '#3399FF'
//                       })
//                     }),
//                     text: new ol.style.Text({
//                       text: size.toString(),
//                       fill: new ol.style.Fill({
//                         color: '#000'
//                       })
//                     })
//                   });
//                   styleCache[size] = style;
//               }
//               return style;
//           }
//           //feature.setStyle(typeitems(feature));
//       }
//   });
var img = new ol.style.Circle({	
    radius: 5,
    stroke: new ol.style.Stroke({
    	color:"rgba(0,255,255,1)", 
        width:1 
    }),
    fill: new ol.style.Fill({
    	color:"rgba(0,255,255,0.3)"
    })
});
var style1 = new ol.style.Style({
    image: img,
    // Draw a link beetween points (or not)
    stroke: new ol.style.Stroke({
    	color:"#000", 
        width:1 
    }) 
});

var selectCluster = new ol.interaction.SelectCluster({
    pointRadius:7,
    featureStyle: function(){	
        return [style1]
    },
    style: function(feature){
        if (typeof feature.get('features') === 'undefined') {
            //content.innerHTML = '<h5><b>' + feature.get('name') + '</b></h5><i>this is an <b>unclustered</b> feature</i>';
        } else {
            var cluster = feature.get('features');
            if (cluster.length>1){

            } else {
                return [
                    new ol.style.Style({
                            image: new ol.style.Circle ({
                                stroke: new ol.style.Stroke({ 
                                    color: "rgba(0,0,192,0.5)", 
                                    width:2 
                                }),
                                fill: new ol.style.Fill({ 
                                    color: "rgba(0,0,192,0.3)" 
                                }),
                                radius:5
                            })
                    })];
            }
        }
    }
});

selectCluster.getFeatures().on(['add'], function (e){	
    var c = e.element.get('features');
    //console.log(c);
    if (c.length==1){
    	var feature = c[0];
        console.log(feature);
        var y = document.getElementById("Infos");
        y.style.display = "block";
        var address = feature.get('address');
        address = address.substr(28);
        var type = feature.get('has_type');
        var Stime = feature.get('has_STime');
        $("#eggroll").html('<article>' + address +"<br />"+"變更型態："+type+"<br / >"+"起始時間："+Stime +'</article>');
    }
});
selectCluster.getFeatures().on(['remove'], function (e){	
    var y = document.getElementById("Infos");
    y.style.display = "none";
    $("#eggroll").html("");
});
  
  /* -----地圖設定顯示----- */
    map = new ol.Map({
        target: 'map',
        layers: [osm,vectorLayer3,clusterLayer],
        controls: ol.control.defaults({
        attribution : false,
        }),
        //loadTilesWhileInteracting: selectCluster, 
        view: new ol.View({
        center: ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'),
        zoom: 11
        })
    });

    map.addInteraction(selectCluster); //把群集分散
}


/* -----各種type判斷----- */
// function typeitems(feature){
//   if (feature.get('has_type')=='1'){
//     return typestyle.typeone;
//   }else if (feature.get('has_type')=='2'){
//     return typestyle.typetwo;
//   }else if (feature.get('has_type')=='3'){
//     return typestyle.typethree;
//   }else if (feature.get('has_type')=='4'){
//     return typestyle.typefour;
//   }else if (feature.get('has_type')=='5'){
//     return typestyle.typefive;
//   }else if (feature.get('has_type')=='6'){
//     return typestyle.typesix;
//   }else if (feature.get('has_type')=='7'){
//     return typestyle.typeseven;
//   }
// }

/* -----收取由php傳來的geojson----- */
function reqListener (result) {
    //把string變成object
    var obj = JSON.parse(result);
    console.log(obj);

    ////////////////////////////////////////////////////////
    // update feature
    //如果vectorSource已經有圖層了!!!!!
    if(typeof(vectorSource)!=='undefined'){ 
      vectorSource.clear();
      vectorSource.addFeatures(loadFeatureFromObj(obj));
    }
    ////////////////////////////////////////////////////////

    /* 點選tag出現的info框框 */
    //click_info(map);
    //map.render();
}
/* -----點選tag出現的info框框----- */
function click_info(map){
    var container = document.getElementById('popup');  // 顯示的框框
    var content = document.getElementById('popup-content'); //框框裡的小框框紀錄文字內容
    var closer = document.getElementById('popup-closer');  //右上角的關閉

    //宣告overlay為變數，紀錄關於他的屬性
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
            function(feature) {
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
                //console.log(feature);
                var coord = map.getCoordinateFromPixel(evt.pixel);
                if (typeof feature.get('features') === 'undefined') {
                    //content.innerHTML = '<h5><b>' + feature.get('name') + '</b></h5><i>this is an <b>unclustered</b> feature</i>';
                } else {
                    var cfeatures = feature.get('features');
                    console.log(cfeatures);
                    if (cfeatures.length >= 1) {
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
                    // if (cfeatures.length == 1) {
                    //     content.innerHTML = '<h5><strong>' + cfeatures[0].get('name') + '</strong></h5><i>this is a single, but <b>clustered</b> feature</i>';
                    // }
                    overlay.setPosition(coord);
                }
                //overlay.setPosition(coord);
            } else {
                overlay.setPosition(undefined);
            }
        });
    });
}

