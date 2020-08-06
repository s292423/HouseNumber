var switchis = 0; //歷程模式切換
var flag = 0; //圖層觸發按鈕判斷
var timeflag = 0; //時間按鈕判斷
var typeflag = 0; //型態按鈕判斷
var addressflag = 0; //地址按鈕判斷
var addressflag1 = 0; //地址按鈕1判斷
var histableflag = 0; //table視窗判斷
var imageinfor = 0; //info視窗判斷
var from = ""; //起始時間
var to = ""; // 結束時間
var oneday = ""; //全部時間
var boxvalue =[]; //存type陣列 
var timevalue =[]; //存time屬性
var County_list = ""; //讓他維持在第一個"請選擇縣市"
var District_list = ""; //讓下一層選單裡面是空的
var District = new Array(); //下一個選單內容
District[0] = ["請選擇鄉鎮"]; //第一個無法選（空的）
District[1] = ["請選擇鄉鎮","松山區","北投區","士林區","內湖區","南港區","文山區","萬華區","大同區","中正區","中山區","大安區","信義區"];
District[2] = ["請選擇鄉鎮","鹽埕區","鼓山區","左營區","楠梓區","三民區","新興區","前金區","苓雅區","前鎮區","旗津區","小港區","鳳山區","林園區","大寮區","大樹區","大社區","仁武區","鳥松區","岡山區","橋頭區","燕巢區","田寮區","阿蓮區","路竹區","湖內區","茄萣區","永安區","彌陀區","梓官區","旗山區","美濃區","六龜區","甲仙區","杉林區","內門區","茂林區","桃源區","那瑪夏區"];
District[3] = ["請選擇鄉鎮","板橋區","三重區","中和區","永和區","新莊區","新店區","樹林區","鶯歌區","三峽區","淡水區","汐止區","瑞芳區","土城區","蘆洲區","五股區","泰山區","林口區","深坑區","石碇區","坪林區","三芝區","石門區","八里區","平溪區","雙溪區","貢寮區","金山區","萬里區","烏來區"];
District[4] = ["請選擇鄉鎮","中區","東區","南區","西區","北區","西屯區","南屯區","北屯區","豐原區","東勢區","大甲區","清水區","沙鹿區","梧棲區","后里區","神岡區","潭子區","大雅區","新社區","石岡區","外埔區","大安區","烏日區","大肚區","龍井區","霧峰區","太平區","大里區","和平區"];
District[5] = ["請選擇鄉鎮","新營區","鹽水區","白河區","柳營區","後壁區","東山區","麻豆區","下營區","六甲區","官田區","大內區","佳里區","學甲區","西港區","七股區","將軍區","北門區","新化區","善化區","新市區","安定區","山上區","玉井區","楠西區","南化區","左鎮區","仁德區","歸仁區","關廟區","龍崎區","永康區","東區","南區","北區","安南區","安平區","中西區"];
District[6] = ["請選擇鄉鎮","桃園區","中壢區","大溪區","楊梅區","蘆竹區","大園區","龜山區","八德區","龍潭區","平鎮區","新屋區","觀音區","復興區"];
District[7] = ["請選擇鄉鎮","宜蘭市","羅東鎮","蘇澳鎮","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","冬山鄉","五結鄉","三星鄉","大同鄉","南澳鄉"];
District[8] = ["請選擇鄉鎮","竹北市","竹東鎮","新埔鎮","關西鎮","湖口鄉","新豐鄉","芎林鄉","橫山鄉","北埔鄉","寶山鄉","峨眉鄉","尖石鄉","五峰鄉"];
District[9] = ["請選擇鄉鎮","苗栗市","苑裡鎮","通霄鎮","竹南鎮","頭份市","後龍鎮","卓蘭鎮","大湖鄉","公館鄉","銅鑼鄉","南庄鄉","頭屋鄉","三義鄉","西湖鄉","造橋鄉","三灣鄉","獅潭鄉","泰安鄉"];
District[10] = ["請選擇鄉鎮","彰化市","鹿港鎮","和美鎮","線西鄉","伸港鄉","福興鄉","秀水鄉","花壇鄉","芬園鄉","員林市","溪湖鎮","田中鎮","大村鄉","埔鹽鄉","埔心鄉","永靖鄉","社頭鄉","二水鄉","北斗鎮","二林鎮","田尾鄉","埤頭鄉","芳苑鄉","大城鄉","竹塘鄉","溪州鄉"];
District[11] = ["請選擇鄉鎮","南投市","埔里鎮","草屯鎮","竹山鎮","集集鎮","名間鄉","鹿谷鄉","中寮鄉","魚池鄉","國姓鄉","水里鄉","信義鄉","仁愛鄉"];
District[12] = ["請選擇鄉鎮","斗六市","斗南鎮","虎尾鎮","西螺鎮","土庫鎮","北港鎮","古坑鄉","大埤鄉","莿桐鄉","林內鄉","二崙鄉","崙背鄉","麥寮鄉","東勢鄉","褒忠鄉","臺西鄉","元長鄉","四湖鄉","口湖鄉","水林鄉"];
District[13] = ["請選擇鄉鎮","太保市","朴子市","布袋鎮","大林鎮","民雄鄉","溪口鄉","新港鄉","六腳鄉","東石鄉","義竹鄉","鹿草鄉","水上鄉","中埔鄉","竹崎鄉","梅山鄉","番路鄉","大埔鄉","阿里山鄉"];
District[14] = ["請選擇鄉鎮","屏東市","潮州鎮","東港鎮","恆春鎮","萬丹鄉","長治鄉","麟洛鄉","九如鄉","里港鄉","鹽埔鄉","高樹鄉","萬巒鄉","內埔鄉","竹田鄉","新埤鄉","枋寮鄉","新園鄉","崁頂鄉","林邊鄉","南州鄉","佳冬鄉","琉球鄉","車城鄉","滿州鄉","枋山鄉","三地門鄉","霧臺鄉","瑪家鄉","泰武鄉","來義鄉","春日鄉","獅子鄉","牡丹鄉"];
District[15] = ["請選擇鄉鎮","臺東市","成功鎮","關山鎮","卑南鄉","鹿野鄉","池上鄉","東河鄉","長濱鄉","太麻里鄉","大武鄉","綠島鄉","海端鄉","延平鄉","金峰鄉","達仁鄉","蘭嶼鄉"];
District[16] = ["請選擇鄉鎮","花蓮市","鳳林鎮","玉里鎮","新城鄉","吉安鄉","壽豐鄉","光復鄉","豐濱鄉","瑞穗鄉","富里鄉","秀林鄉","萬榮鄉","卓溪鄉"];
District[17] = ["請選擇鄉鎮","馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉"];
District[18] = ["請選擇鄉鎮","中正區","七堵區","暖暖區","仁愛區","中山區","安樂區","信義區"];
District[19] = ["請選擇鄉鎮","東區","北區","香山區"];
District[20] = ["請選擇鄉鎮","東區","西區"];
District[21] = ["請選擇鄉鎮","南竿鄉","北竿鄉","莒光鄉","東引鄉"];
District[22] = ["請選擇鄉鎮","金城鎮","金沙鎮","金湖鎮","金寧鄉","烈嶼鄉","烏坵鄉"];

$( document ).ready(function() {

    /* -----歷程模式切換----- */
    $("#switchboxx").blur();
    $('#switchboxx').change(function(){
        $('#Address').prop("checked",false);
        $('#Time').prop("checked",false);
        $('#Type').prop("checked",false);
        document.getElementById("Timebox").style.display = "none";
        document.getElementById("Typebox").style.display = "none";
        document.getElementById("Addressbox").style.display = "none";
        document.getElementById("Addressbox1").style.display = "none";
        document.getElementById("histable").style.display = "none";
        timeflag = 0;
        typeflag = 0;
        addressflag = 0;
        addressflag1 = 0;
        if(switchis == 0){
            switchis = 1;
            document.getElementById("knowlabel").style.display = "none";
            document.getElementById("timetag").style.color = "#999";
            document.getElementById("typetag").style.color = "#999";
            document.getElementById("Time").disabled = true;
            document.getElementById("Type").disabled = true;
            document.getElementById('area1').value = "";
            nextStep1("");
            var obj = "{\"type\":\"FeatureCollection\",\"crs\":{\"type\":\"name\",\"properties\":{\"name\":\"EPSG:4326\"}},\"features\":[]}";
            reqListener(obj);
        }else{
            document.getElementById("knowlabel").style.display = "block";
            document.getElementById("timetag").style.color = "#000";
            document.getElementById("typetag").style.color = "#000";
            document.getElementById("Time").disabled = false;
            document.getElementById("Type").disabled = false;
            switchis = 0;
            init_run(boxvalue);
        }
    });
    /* -----info點選圖片----- */
    $('#imageinfor').click(function(){
        var x = document.getElementById("imageinforbox");
        if (imageinfor == 0) {
            imageinfor = 1;
            x.style.display = "block";
        } else {
            imageinfor = 0;
            x.style.display = "none";
        }
    });

    /* -----圖層控制按鈕觸發----- */
    $("#testButton").blur();
    $('#testButton').click(function(){
        if (flag == 0 ){
            flag = 1;
            $("#choose").slideDown();
            $("#choose").blur();
        }else{
            flag = 0;
            $("#choose").slideUp();
        }
    });

    /* -----時間按鈕觸發----- */
    $('#Time').click(function(){
        var x = document.getElementById("Timebox");
        if (timeflag == 0) {
            timeflag = 1;
            //$('#Timebox').draggable();
            x.style.display = "block";
            
        } else {
            timeflag = 0;
            x.style.display = "none";
        }
    });
    /* 隨時間變化顯示 */
    var writeResult = function (num) {
        //console.log(num);
        from = changeDate(num.from_pretty);
        to = changeDate(num.to_pretty);
        oneday = from + "to" + to;
        oneday = oneday.replace(/,/g,"-");
        //datetime(oneday);
        //$(".js-result").html(result);
    };

    /* 初始時間顯示 */
    var startResult = function (num) {
        //console.log(num);
        from = changeDate(num.min_pretty);
        to = changeDate(num.max_pretty);
        oneday = from + "to" + to;
        oneday = oneday.replace(/,/g,"-");
        //datetime(oneday);
        //$(".js-result").html(result);
    };
    /* 時間軸拉bar */
    $("#range").ionRangeSlider({
        type:"double",
        min:+moment("19991031").format("X"),
       // min: +moment().subtract(1, "years").format("X"),
        max: +moment().format("X"),
        from: +moment("19991031").format("X"),
        prettify: function (num) {
            var m = moment(num, "X").locale("zh-tw");
            return m.format("LL");
        },
        onStart: function (num) {
            startResult(num);
        },
        onChange: function (num) {
            writeResult(num);
        }
    });
    /* 初始讀取已選取時間屬性存成陣列 */
    var $times = $('input[class=boxx1]:checked');
    timevalue =[];
    for(var i = 0;i<$times.length;i++){
        if ($times[i].id =="startunknown"){
            timevalue.push("(?has_STime = \"unknown\")");
        }else if($times[i].id =="endnew"){
            timevalue.push("(?has_ETime = \"not yet\")");
        }
    }
    /* 之後變更後的時間屬性按鈕觸發 */
    $(".boxx1").change( function(){
        timevalue =[];
        var $times = $('input[class=boxx1]:checked');
        for(var i = 0;i<$times.length;i++){
            if ($times[i].id =="startunknown"){
                timevalue.push("(?has_STime = \"unknown\")");
            }else if($times[i].id =="endnew"){
                timevalue.push("(?has_ETime = \"not yet\")");
            }
        }
    });
    /* 時間塊確認鈕觸發 */
    $('#BT2').click(function(){
        datetime(oneday,timevalue);
    });
    /* 時間塊清除鈕觸發 */
    $('#reset2').click(function(){
        $('#startunknown').prop("checked",false);
        $('#endnew').prop("checked",false);
        datetime("","");
    });

    /* -----型態按鈕觸發----- */
    $('#Type').click(function(){
        var x = document.getElementById("Typebox");
        if (typeflag == 0) {
            typeflag = 1;
            $('#Typebox').draggable();
            x.style.display = "block";
            
        } else {
            typeflag = 0;
            x.style.display = "none";
        }
    });
    /* 先把全部type打勾 */
    $('#delete').attr("checked",true);
    $('#first').attr("checked",true);
    $('#change').attr("checked",true);
    $('#add').attr("checked",true);
    $('#conbime').attr("checked",true);
    $('#set').attr("checked",true);
    $('#decorate').attr("checked",true);
    /* Check if checkbox is checked with jQuery */
    /* 初始讀取已選按鈕存成陣列 */
    var $boxes = $('input[class=boxx]:checked');
    boxvalue =[];
    for(var i = 0;i<$boxes.length;i++){
        if ($boxes[i].id =="first"){
            boxvalue.push("1");
        }else if($boxes[i].id =="change"){
            boxvalue.push("2");
        }else if($boxes[i].id =="add"){
            boxvalue.push("3");
        }else if($boxes[i].id =="conbime"){
            boxvalue.push("4");
        }else if($boxes[i].id =="delete"){
            boxvalue.push("?has_next = \"null\" && ?type != \"0\" && ?type != \"13\"");
        }else if($boxes[i].id =="set"){
            boxvalue.push("6");
        }else if($boxes[i].id =="decorate"){
            boxvalue.push("7");
        }
    }
    init_run(boxvalue);
    /* 之後變更後的型態按鈕觸發 */
    $(".boxx").change(function(){
        boxvalue =[];
        var $boxes = $('input[class=boxx]:checked');
        for(var i = 0;i<$boxes.length;i++){
            if ($boxes[i].id =="first"){
                boxvalue.push("1");
            }else if($boxes[i].id =="change"){
                boxvalue.push("2");
            }else if($boxes[i].id =="add"){
                boxvalue.push("3");
            }else if($boxes[i].id =="conbime"){
                boxvalue.push("4");
            }else if($boxes[i].id =="delete"){
                boxvalue.push("?has_next = \"null\" && ?type != \"0\" && ?type != \"13\"");
            }else if($boxes[i].id =="set"){
                boxvalue.push("6");
            }else if($boxes[i].id =="decorate"){
                boxvalue.push("7");
            }
        }
        run(boxvalue);
    });
    
    /* -----地址按鈕觸發----- */
    $('#Address').click(function(){
        var x = document.getElementById("Addressbox");
        if (addressflag == 0 && switchis ==0) {
            addressflag = 1;
            $('#Addressbox').draggable();
            x.style.display = "block";
            
        } else {
            addressflag = 0;
            x.style.display = "none";
        }
        var y = document.getElementById("Addressbox1");
        if (addressflag1 == 0 && switchis ==1) {
            addressflag1 = 1;
            $('#Addressbox1').draggable();
            y.style.display = "block";
            
        } else {
            addressflag1 = 0;
            y.style.display = "none";
        }
    });
    /* 地址選取發送按鈕觸發 */
    $('#BT').click(function(){
            var o = $("#Countyname option:selected").text()
            var p = $("#Districtname option:selected").text();
            allupdate(o+p);
            town(o+p);
    });

    /* 歷程模式！！！！還沒好 */
    $('#BT1').click(function(){
        //var x = document.getElementById("histable");
        var y = document.getElementById('area1').value;
        ishis(y);
        // if (histableflag == 0) {
        //     histableflag = 1;
        //     $('#histable').draggable();
        //     x.style.display = "block";

        // } else {
        //     histableflag = 0;
        //     x.style.display = "none";
        // }
    });

    /* 地址清除按鈕觸發 */
    $('#Addressbox').find('#reset').click(function(){
            var selects = document.getElementsByTagName('select');
            District_list.options.length = 0;
            for (var i = 0; i<selects.length; i++){
                selects[i].selectedIndex = 0;
            }
            District_list.options[District_list.options.length] = new Option(District[0][0]);
            nextStep(0);
            var empty = "";
            allupdate("請選擇縣市請選擇鄉鎮");
            town(empty);
    });
    $('#Addressbox1').find('#reset').click(function(){
        document.getElementById('area1').value = "";
        nextStep1("");
        var x = document.getElementById("histable");
        if (x.style.display === "block") {
            x.style.display = "none";
            histableflag = 0;
        }
        console.log("取消");
    });

    /* -----時間關閉按鈕觸發----- */
    $('#timeclose').click(function(){
        var x = document.getElementById("Timebox");
        if (x.style.display === "block") {
            x.style.display = "none";
            timeflag = 0;
            $('#Time').prop("checked",false);
        }
    });
    /* -----型態關閉按鈕觸發----- */
    $('#typeclose').click(function(){
        var x = document.getElementById("Typebox");
        if (x.style.display === "block") {
            x.style.display = "none";
            typeflag = 0;
            $('#Type').prop("checked",false);
        }
    });
    /* -----地址關閉按鈕觸發----- */
    $('#addrclose').click(function(){
        var x = document.getElementById("Addressbox");
        if (x.style.display === "block") {
            x.style.display = "none";
            addressflag = 0;
            $('#Address').prop("checked",false);
        }
    });
    $('#addrclose1').click(function(){
        var x = document.getElementById("Addressbox1");
        if (x.style.display === "block") {
            x.style.display = "none";
            addressflag1 = 0;
            $('#Address').prop("checked",false);
        }
    });

    $('#imageinforboxclose').click(function(){
        var x = document.getElementById("imageinforbox");
        if (x.style.display === "block") {
            x.style.display = "none";
            imageinfor = 0;
        }
    });
}) 
/* 把西元時間改成民國 */
function changeDate(date){
    arr = "";
    date = date.replace(/年/, "-");
    date = date.replace(/月/, "-");
    date = date.replace(/日/, "");
    arr = date.split("-");
    arr[0] = arr[0]-1911;
    return arr;
}
/* 下一層選單可以出現 */
function nextChoose(IDX){ 
    District_list.options.length = 0;
    if (IDX > 0) {
        for (i=0; i<District[IDX].length; i++){
            District_list.options[District_list.options.length] = new Option(District[IDX][i]);
        }
    }
    else {
        District_list.options[District_list.options.length] = new Option(District[0][0]);
        nextStep(0);
    }
}
/* 地址1下一個按鈕可以按 */
function nextStep(IDX){
    if (IDX > 0) {
        document.getElementById("BT").disabled = false;
    }
    else {
        document.getElementById("BT").disabled = true;
    }
}
/* 地址2下一個按鈕可以按 */
function nextStep1(value){
    if (value.length >0) {
        document.getElementById("BT1").disabled = false;
    }
    else {
        document.getElementById("BT1").disabled = true;
    }
}
/* 重新開始選 */
function init(){
    County_list = document.Addr.County;
    District_list = document.Addr.District;
}
/* 選擇之後變換視窗區域 */
function allupdate(county){ 
    if(county !== "請選擇縣市請選擇鄉鎮"){								
        var features=currentLayer.getSource().getFeatures();
        for (var i = 0;i<features.length;i++) {				    
            if(features[i].get("mapcode")==county){
                var Extent = features[i].getGeometry().getExtent();
                map.getView().fit(Extent, map.getSize());
                var style = new ol.style.Style({fill:new ol.style.Fill({color: [255, 255, 255, 0]}),stroke:new ol.style.Stroke({color: '#7cb5ec',width: 3})});
				features[i].setStyle(style);
            }else{
                var style=new ol.style.Style({fill:new ol.style.Fill({color: [255, 255, 255, 0.5]}),stroke:new ol.style.Stroke({color: '#888888',width: 1})});
				features[i].setStyle(style);
            }
        }
    }else{
        var featuress=currentLayer.getSource().getFeatures();
        for (var i = 0;i<featuress.length;i++) {				    
            var style1 = new ol.style.Style({fill:new ol.style.Fill({color: [255, 255, 255,0]}),stroke:new ol.style.Stroke({color: '#888888',width: 1})});
            featuress[i].setStyle(style1);
            map.getView().setCenter(ol.proj.transform([121, 23.8], 'EPSG:4326', 'EPSG:3857'));
            map.getView().setZoom(7.95);
        }        				
    }
}	