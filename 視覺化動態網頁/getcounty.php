<?php
    $url = $_POST['url'];
    if($url){
        $obj = file_get_contents($url);
        echo $obj;  
    }
    
?>