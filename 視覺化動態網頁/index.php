<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="Shortcut Icon" type="image/x-icon" href="./img/planet-earth.png" />
        <link rel="stylesheet" href="./css/bootstrap.css" type="text/css">
        <!-- <script src="http://openlayers.org/api/OpenLayers.js"></script> -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="./js/jquery-1.12.3.min.js"></script>
        <script src="./js/ion.rangeSlider.js"></script>
        <script src="./js/moment.js"></script>
        <script src="./js/moment-with-locales.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <title>門牌歷程資料檢索系統</title> 
        <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
        <link rel="stylesheet" href="./css/ion.rangeSlider.css" />
        <link rel="stylesheet" href="./css/ion.rangeSlider.skinFlat.css" />
        <link rel="stylesheet" href="./css/popup.css" type="text/css">
        <link rel="stylesheet" href="./css/show.css" type="text/css">
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
        <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
        <!-- <script src="http://requirejs.org/docs/release/2.2.0/minified/require.js"></script> -->
        <script src='https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js'></script>
        <script type="text/javascript" language="javascript" src="./js/openlayers.js" charset="utf-8"></script>
        <script type="text/javascript" language="javascript" src="./js/checkbox.js" charset="utf-8"></script>
        <script type="text/javascript" src="https://cdn.rawgit.com/Viglino/OL3-AnimatedCluster/gh-pages/interaction/selectclusterinteraction.js"></script>
        <script type="text/javascript" src="https://cdn.rawgit.com/Viglino/OL3-AnimatedCluster/gh-pages/layer/animatedclusterlayer.js"></script>
    </head>

    <script>
        var currentLayer;
        var string = "";
        var str_type = "";
        var temp = "";
        var str_addr = "";
        var str_time = "";
        var county = "";
        
        function run(boxvalue){
            str_type = "";
            temp = "";
            var count = true;
            var count1 = true;
            for(var i=0;i<boxvalue.length;i++){
                //str_type = str_type+"?type = \""+boxvalue[i]+"\"";
                if(boxvalue[i]=="?has_next = \"null\" && ?type != \"0\" && ?type != \"13\""){
                    temp = boxvalue[i];
                    count = false;
                    continue;
                }
                str_type = str_type+"?type = \""+boxvalue[i]+"\"";
                if(count==false && boxvalue.length == 2){
                    count1 = false;
                }
                if(boxvalue.length-i>1 && count1 !=false){
                    str_type = str_type+" || ";
                }
            }
            if(str_type!="" && temp!=""){
                str_type = "(("+str_type;
                str_type = str_type+") && ?has_next != \"null\") || ("+temp+")";
            }else if (str_type!=""){
                str_type = "("+str_type;
                str_type = str_type+") && ?has_next != \"null\"";
            }else if (temp!=""){
                str_type = temp;
            }
            
            test(str_type, str_addr, str_time);
            //console.log(string);
        }
        function init_run(boxvalue){
            str_type = "";
            temp = "";
            var count = true;
            var count1 = true;
            for(var i=0;i<boxvalue.length;i++){
                //str_type = str_type+"?type = \""+boxvalue[i]+"\"";
                if(boxvalue[i]=="?has_next = \"null\" && ?type != \"0\" && ?type != \"13\""){
                    temp = boxvalue[i];
                    count = false;
                    continue;
                }
                str_type = str_type+"?type = \""+boxvalue[i]+"\"";
                if(count==false && boxvalue.length == 2){
                    count1 = false;
                }
                if(boxvalue.length-i>1 && count1 !=false){
                    str_type = str_type+" || ";
                }
            }
            if(str_type!="" && temp!=""){
                str_type = "(("+str_type;
                str_type = str_type+") && ?has_next != \"null\") || ("+temp+")";
            }else if (str_type!=""){
                str_type = "("+str_type;
                str_type = str_type+") && ?has_next != \"null\"";
            }else if (temp!=""){
                str_type = temp;
            }
        }
        function town(o){
            str_addr = "";
            if(o == ""){
                str_addr = "";
            }else{
                str_addr = "regex(?subject, \""+o+"\")";
            }
            test(str_type, str_addr, str_time);
        }
        function datetime(oneday,timevalue){
            str_time = "";
            if(oneday != "" && timevalue != ""){
                var arr ="";
                arr = oneday.split("to");
                str_time=" && (xsd:date(?has_STime) > xsd:date(\""+arr[0]+"\") && xsd:date(?has_ETime) < xsd:date(\""+arr[1]+"\")";
                for(var i=0;i<timevalue.length;i++){
                    str_time = str_time + " || " + timevalue[i];
                }
                str_time = str_time + ")";
                //console.log(str_time);
            }else if(oneday != ""){
                var arr ="";
                arr = oneday.split("to");
                str_time=" && xsd:date(?has_STime) > xsd:date(\""+arr[0]+"\") && xsd:date(?has_ETime) < xsd:date(\""+arr[1]+"\")";
                //console.log(str_time);
            }
            test(str_type, str_addr, str_time);
        }
        function init_county(county){
            str_type = "("+str_type + ") && regex(?subject, \""+county+"\")";
            test(str_type, str_addr, str_time);
        }
        function showloc(position){
            url = "https://api.opencube.tw/location?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "";

            $.ajax({
                'url': './getcounty.php',
                'method': 'post',
                'data': {
                    'url':url,
                },
                'success': function(result){
                    obj = JSON.parse(result);
                    county = obj.data.city;
                    county = county.replace(/台/, "臺");
                    init_county(county);
                    console.log(county);
                },
            });
        }
        function test(str_type, str_addr, str_time){
            string = "";
            if(str_type == ""){ //你一定要勾
                string = "FILTER(regex(?subject, \"你好嗎\"))";
            }else if(str_addr != "" && str_time != ""){ //勾了才可以出現地址的
                string = "FILTER((" + str_type + ") && " + str_addr + str_time + ")";
            }else if(str_addr != "" ){
                string = "FILTER((" + str_type + ") && " + str_addr + ")";
            }else if(str_time != "" ){
                string = "FILTER((" + str_type + ")" + str_time + ")";
            }else if(str_type != ""){
                string = "FILTER(" + str_type + ")";
            }
            console.log(string);
            $.ajax({
                url: './geturl.php', //relative address
                type: 'POST',
                data: { 
                    'string': string
                },    
                success: function(result){
                    //console.log(result);
                    reqListener(result);
                }
            });
        }
        function ishis(y){
            
            y = y.replace(/(?:\r\n|\r|\n)/g, '');
            output = y.split(",");
            // $.ajax({
            //     url: './geturl1.php', //relative address
            //     type: 'POST',
            //     data: { 
            //         'array': output
            //     },    
            //     success: function(result){
            //         //console.log(result);
            //         reqListener(result);
            //     }
            // });
        }
        function geolocation(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMap);
                navigator.geolocation.getCurrentPosition(showloc);
            } else {
                alert("請重新整理頁面,並定位");
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        };

        $(function(){
            geolocation();
        });
    </script>

    <body onload="init();">
            <div id="map" class="map"></div>
            <div class = "header">
                <div class = "webtitle">門牌歷程資料檢索系統</div>
            </div>
            <div class="switchhh">
                <div class="onoffswitch" id="switchboxx">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
                    <label class="onoffswitch-label" for="myonoffswitch">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
                <label for="myonoffswitch" id="switch">歷程模式</label>
            </div>
            <img id = "imageinfor" class = "imageinfor" src="./img/information.png">
            <div class = "container">
                <div id="panel"><button id="testButton" class="btn btn-primary">圖層選單</button></div>
                <div id="choose">
                    <input type="checkbox" id="Time"/>
                    <label for="Time" id="timetag">時間</label><br>
                    <input type="checkbox" id="Type"/>
                    <label for="Type" id="typetag">變更型態</label><br>
                    <input type="checkbox" id="Address"/>
                    <label for="Address" id="addrtag">鄉鎮市行政區</label>
                </div>
            </div>
            <!-- <div id="popup" class="ol-popup">
                <button type="button" id="popup-closer" class="ol-popup-closer">&times;</button>
                <div id="popup-content"class="y"></div>
            </div> -->
            
            <div id="knowlabel"class='legend-scale'>
                <div class='legend-title'>地址數量</div>
                <ul class='legend-labels clearfix'>
                    <li id="lv1"><span style='background:rgba(255,0,0, 1);'></span><h>>3000</h></li>
                    <li id="lv2"><span style='background:rgba(247,80,0,1);'></span><h>800~3000</h></li>
                    <li id="lv3"><span style='background:rgba(255,146,36, 1);'></span><h>100~800</h></li>
                    <li id="lv4"><span style='background:rgba(255,211,6, 1);'></span><h>50~100</h></li>
                    <li id="lv5"><span style='background:rgba(130,217,0, 1);'></span><h><50</h></li>
                </ul>
            </div>
            <div id="Timebox" class = "box medium clearfix">
                <button type="button" class="closeX" id="timeclose">&times;</button>
                <div class="title">
                    <h6>時間</h6>
                </div>
                <div class="rangebox">
                    <input type="text" id="range" value="" name="range" />
                    <!-- <div class="result">
                        <span class="js-result"></span>
                    </div> -->
                </div>
                <div class="choose1">
                    <input type="checkbox" id="startunknown" class="boxx1"/>
                        <label for="startunknown">起始時間未知</label>
                    <input type="checkbox" id="endnew" class="boxx1"/>
                        <label for="endnew">最新門牌時間</label><br>
                </div>
                <div class="butbox">
                    <button type="reset" id="reset2" class="butt">清除</button>
                    <button type="button" id="BT2" class="butt">確認</button>
                </div>
            </div>
            <div id="Typebox" class = "box s clearfix">
                <button type="button" class="closeX" id="typeclose">&times;</button>
                <div class="title">
                    <h6>類別</h6>
                </div>
                <div id="typecheck">
                    <input type="checkbox" id="delete" class="boxx"/>
                        <label for="delete">門牌廢止</label><br>
                    <input type="checkbox" id="first" class="boxx"/>
                        <label for="first">門牌初編</label><br>
                    <input type="checkbox" id="change" class="boxx"/>
                        <label for="change">門牌改編</label><br>
                    <input type="checkbox" id="add" class="boxx"/>
                        <label for="add">門牌增編</label><br>
                    <input type="checkbox" id="conbime" class="boxx"/>
                        <label for="conbime">門牌合併</label><br>
                    <input type="checkbox" id="set" class="boxx"/>
                        <label for="set">行政區域調整</label><br>
                    <input type="checkbox" id="decorate" class="boxx"/>
                        <label for="decorate">門牌整編</label><br>
                </div>
            </div>
            <div id="Addressbox" class = "box large clearfix">
                <button type="button" class="closeX" id="addrclose" >&times;</button>
                <div class="title">
                    <h6>鄉鎮市行政區</h6>
                </div>
                <form class="firstcounty" name="Addr">
                    <select id="Countyname" name="County" onChange="nextChoose(this.selectedIndex);">
                        <option selected>請選擇縣市</option>
                        <option>臺北市</option>
                        <option>高雄市</option>
                        <option>新北市</option>
                        <option>臺中市</option>
                        <option>臺南市</option>
                        <option>桃園市</option>
                        <option>宜蘭縣</option>
                        <option>新竹縣</option>
                        <option>苗栗縣</option>
                        <option>彰化縣</option>
                        <option>南投縣</option>
                        <option>雲林縣</option>
                        <option>嘉義縣</option>
                        <option>屏東縣</option>
                        <option>臺東縣</option>
                        <option>花蓮縣</option>
                        <option>澎湖縣</option>
                        <option>基隆市</option>
                        <option>新竹市</option>
                        <option>嘉義市</option>
                        <option>連江縣</option>
                        <option>金門縣</option>
                    </select>
                    <select id="Districtname" name="District" onChange="nextStep(this.selectedIndex)">
                        <option selected>請選擇鄉鎮</option>
                    </select>
                </form>
                <div class="butbox">
                    <button type="reset" id="reset" class="butt">清除</button>
                    <button type="button" id="BT" class="butt" disabled>確認</button>
                </div>
            </div>
            <div id="Addressbox1" class = "box Xlarge clearfix">
                <button type="button" class="closeX" id="addrclose1" >&times;</button>
                <div class="title">
                    <h6>鄉鎮市行政區</h6>
                </div>
                <div class="content">
                    <textarea id="area1" class="area1" placeholder="請按照此格式輸入..." onkeyup="nextStep1(this.value)"></textarea>
                </div>    
                <div class="butbox">
                    <button type="reset" id="reset" class="butt">清除</button>
                    <button type="button" id="BT1" class="butt" disabled>確認</button>
                </div>
            </div>
            <div id="histable" class = "box Xlarge clearfix">
                <div class="title">
                    <h6>歷程門牌地址變更</h6>
                </div>
            </div>

            <!-- 地址詳細資訊 -->
            <div id="Infos" class = "box Xmedium clearfix">
                <!-- <button type="button" class="closeX" id="infos" >&times;</button> -->
                <div class="title">
                        <h6>門牌地址資料</h6>
                </div>
                <div id="eggroll"></div>
            </div>
            <!-- 說明文件 -->
            <div id="imageinforbox" class = "box XXlarge clearfix">
                <button type="button" class="closeX" id="imageinforboxclose">&times;</button>
                <br />
                <h2>&nbsp;&nbsp;&nbsp;說明</h2>
            </div>
    </body>
</html>