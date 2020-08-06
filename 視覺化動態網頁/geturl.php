<?php
    ini_set('display_errors','Off');
    ini_set('error_reporting', E_ALL );
    define('WP_DEBUG', false);
    define('WP_DEBUG_DISPLAY', false);
    ini_set('memory_limit',-1);
    
    // if (isset($_POST["array"]) && !empty($_POST["array"])) { //Checks if value exists
    //     $action = $_POST["array"];
    // }
    $action = ["雲林縣斗六市三平里001鄰洛陽路９巷３號二樓之２","雲林縣西螺鎮中興里001鄰延平路３７０號"];
    $row = array();
    $bigrow = array();
    $Xbigrow = array();
    foreach($action as $value){
        $before = urlencode("PREFIX addr: <http://addr.sgis.tw/ontology/> select * where { ?subject addr:type ?type . ?subject addr:TWD97X ?TWD97X . ?subject addr:TWD97Y ?TWD97Y . ?subject addr:has_STime ?has_STime . ?subject addr:has_ETime ?has_ETime . ?subject addr:has_next ?has_next . ?subject addr:has_pre ?has_pre FILTER(regex(?subject, \"$value\")) }");
        $url = "https://rdf.sgis.tw/?default-graph-uri=&query=$before&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on";
        $json = file_get_contents($url);
        $json_data = json_decode($json, true);
        $need = $json_data['results']['bindings'][0];

        $row["subject"] = $value;
        if(@$need['has_STime'] == true){
            $row["has_STime"] = $need['has_STime']['value'];
        }
        if(@$need['has_ETime'] == true){
            $row["has_ETime"] = $need['has_ETime']['value'];
        }
        if(@$need['type'] == true){
            $row["has_type"] = $need['type']['value'];
        }
        $co = array();
        $co = twd97_to_latlng((float)$need['TWD97X']['value'],(float)$need['TWD97Y']['value']);
        $row["coordinates"] = [$co[1],$co[0]];
        $row["color"] = "1";
        array_push($bigrow,$row);
        if($need['has_next']['value']!= "not yet" && $need['has_pre']){
            $preflag = 1;
            $nextflag = 1;
            $row1 = substr($need['has_pre']['value'],28);
            $row2 = substr($need['has_next']['value'],28);
        }else if($need['has_next']['value']!= "not yet"){
            $nextflag = 1;
            $row2 = substr($need['has_next']['value'],28);
        }else if($need['has_pre']){
            $preflag = 1;
            $row1 = substr($need['has_pre']['value'],28);
        }
        if($preflag == 1){
            pree($row1);
        }
        if($nextflag == 1){
            nextt($row2);
        }

        array_push($Xbigrow,$bigrow);
        print_r($Xbigrow);
        $bigrow = array();
        $preflag = 0;
        $nextflag = 0;
        // arrangeData($row);
    }
    function pree($row1){
        $row = array();
        $before = urlencode("PREFIX addr: <http://addr.sgis.tw/ontology/> select * where { ?subject addr:type ?type . ?subject addr:TWD97X ?TWD97X . ?subject addr:TWD97Y ?TWD97Y . ?subject addr:has_STime ?has_STime . ?subject addr:has_ETime ?has_ETime . ?subject addr:has_next ?has_next  FILTER(regex(?subject, \"$row1\")) }");
        $url = "https://rdf.sgis.tw/?default-graph-uri=&query=$before&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on";
        $json = file_get_contents($url);
        $json_data = json_decode($json, true);
        $need = $json_data['results']['bindings'][0];
        //print_r($need);
        $row["subject"] = $row1;
        if(@$need['has_STime'] == true){
            $row["has_STime"] = $need['has_STime']['value'];
        }
        if(@$need['has_ETime'] == true){
            $row["has_ETime"] = $need['has_ETime']['value'];
        }
        if(@$need['type'] == true){
            $row["has_type"] = $need['type']['value'];
        }
        $co = array();
        $co = twd97_to_latlng((float)$need['TWD97X']['value'],(float)$need['TWD97Y']['value']);
        $row["coordinates"] = [$co[1],$co[0]];
        $row["color"] = "0";
        global $bigrow;
        array_unshift($GLOBALS['bigrow'], $row);
        
        if($need['has_pre']){ //改寫rdf然後寫判斷式
            print('apple3333333');
            $row1 = substr($need['has_pre']['value'],28);
            pree($row1);
        }
    }
    function nextt($row2){
        $row = array();
        $before = urlencode("PREFIX addr: <http://addr.sgis.tw/ontology/> select * where { ?subject addr:type ?type . ?subject addr:TWD97X ?TWD97X . ?subject addr:TWD97Y ?TWD97Y . ?subject addr:has_STime ?has_STime . ?subject addr:has_ETime ?has_ETime . ?subject addr:has_next ?has_next . ?subject addr:has_pre ?has_pre FILTER(regex(?subject, \"$row2\")) }");
        $url = "https://rdf.sgis.tw/?default-graph-uri=&query=$before&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on";
        $json = file_get_contents($url);
        $json_data = json_decode($json, true);
        $need = $json_data['results']['bindings'][0];
        $row["subject"] = $row2;
        if(@$need['has_STime'] == true){
            $row["has_STime"] = $need['has_STime']['value'];
        }
        if(@$need['has_ETime'] == true){
            $row["has_ETime"] = $need['has_ETime']['value'];
        }
        if(@$need['type'] == true){
            $row["has_type"] = $need['type']['value'];
        }
        $co = array();
        $co = twd97_to_latlng((float)$need['TWD97X']['value'],(float)$need['TWD97Y']['value']);
        $row["coordinates"] = [$co[1],$co[0]];
        $row["color"] = "0";
        global $bigrow;
        array_push($GLOBALS['bigrow'], $row);
        if($need['has_next']['value'] != "not yet"){
            print('apple2222222');
            $row2 = substr($need['has_next']['value'],28);
            nextt($row2);
        }
    }

    arrangeData($Xbigrow);
    function arrangeData($Xbigrow){
        $geojson = array();
        $temp = array();
        $geojson["type"] = "FeatureCollection";
        
        $temp["type"] = "name";
        $temp["properties"] = ["name"=>"EPSG:4326"];
        $geojson["crs"] = $temp;
        $allcounty = array();

        foreach($Xbigrow as $value){
            $onecounty = array();
            $geometry = array();
            $properties = array();
            $temp = array();
            $onecounty["type"] = "Feature";
            $geometry["type"] = "LineString";
            foreach($value as $point){
                $point['subject']['value']
                $point['has_STime']['value']
                $point['has_ETime']['value']
                $point['has_type']['value']
                array_push($temp,$point['coordinates']);
            }
            $geometry["coordinates"] = $temp;
            $onecounty["geometry"] = $geometry;
            print_r($onecounty);
        }
            //twd97_to_latlng((float)$value['TWD97X']['value'],(float)$value['TWD97Y']['value']);
        //     if ($value['TWD97X']['value']=="null"){
        //         continue;
        //     }else{
        //         $onecounty["type"] = "Feature";
        //         $geometry["type"] = "LineString";
        //         $co = array();
        //         $co = twd97_to_latlng((float)$value['TWD97X']['value'],(float)$value['TWD97Y']['value']);
        //         $geometry["coordinates"] = [$co[1],$co[0]];
        //     }
        //     $onecounty["geometry"] = $geometry;
        //     $properties["address"] = $value['subject']['value'];

        //     if(@$value['has_STime'] == true){
        //         $properties["has_STime"] = $value['has_STime']['value'];
        //     }
        //     if(@$value['has_ETime'] == true){
        //         $properties["has_ETime"] = $value['has_ETime']['value'];
        //     }
        //     if(@$value['type'] == true){
        //         $properties["has_type"] = $value['type']['value'];
        //     }
        //     $onecounty["properties"] = $properties;
        //     array_push($allcounty,$onecounty);
        // }
        // $geojson["features"] = $allcounty;
        // //echo $count;
        // echo json_encode($geojson,JSON_UNESCAPED_UNICODE),"\n";
    }

    function twd97_to_latlng($x, $y) {
        $a = 6378137.0;
        $b = 6356752.314245;
        $lng0 = 121 * M_PI / 180;
        $k0 = 0.9999;
        $dx = 250000;
        
        $dy = 0;
        $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);
        $x -= $dx;
        $y -= $dy;
        $M = $y / $k0;
        $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
        $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));
        $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
        $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
        $J3 = (151 * pow($e1, 3) / 96.0);
        $J4 = (1097 * pow($e1, 4) / 512.0);
        $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);
        $e2 = pow(($e * $a / $b), 2);
        $C1 = pow($e2 * cos($fp), 2);
        $T1 = pow(tan($fp), 2);
        $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
        $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);
        
        $D = $x / ($N1 * $k0);
        $Q1 = $N1 * tan($fp) / $R1;
        $Q2 = (pow($D, 2) / 2.0);
        $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
        $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
        $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4);
        $Q5 = $D;
        $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
        $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
        $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);
        $lat = ($lat * 180) / M_PI;
        $lng = ($lng * 180) / M_PI;
        
        return array(
                $lat,$lng
            );
    }
?>