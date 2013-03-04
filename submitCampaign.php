<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
    // echo "hello world";
    $xmlFile = "xmlCampaign.xml";
    $fh = fopen($xmlFile, 'w') or die("can't open write file");
    // var_dump(is_writable($xmlFile));
    
    fwrite($fh, $_POST["xml"]);
    
    fclose($fh);
    
    $url = "https://test.ohmage.org/app/campaign/create";
    $ch = curl_init($url);
    //curl_setopt($ch, CURLOPT_URL, $url); 
    
    $data = array("auth_token" => $_POST["auth_token"],
        "client" => $_POST["client"],
        "running_state" => $_POST["running_state"],
        "privacy_state" => $_POST["privacy_state"],
        "class_urn_list" => $_POST["class_urn_list"],
        //"xml" => "@C:\\Users\\TaiPham\\Documents\\GitHub\\campaignAuthoringTool\\xmlCampaign.xml");
        "xml" => "@/Users/tai/campaignAuthoringTool/xmlCampaign.xml");

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true); // enable tracking
    
    $response = curl_exec($ch);
    $headerSent = curl_getinfo($ch, CURLINFO_HEADER_OUT ); // request headers
    
    if(curl_errno($ch)){
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);

    echo $headerSent;
    echo $response;
?>