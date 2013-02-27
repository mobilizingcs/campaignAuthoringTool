<?php
    $xmlFile = "xmlCampaign.xml";
    $fh = fopen($xmlFile, 'w');
    echo "test"s;
    fwrite($fh, $_POST["xml"]);
    echo "test2"s;
    fclose($fh);
    echo "test3"s;
    $url = "https://test.ohmage.org/app/campaign/create";
    $ch = curl_init($url);
    //curl_setopt($ch, CURLOPT_URL, $url); 
    echo "test4"s;
    $data = array("auth_token" => $_POST["auth_token"],
        "client" => $_POST["client"],
        "running_state" => $_POST["running_state"],
        "privacy_state" => $_POST["privacy_state"],
        "class_urn_list" => $_POST["class_urn_list"],
        "xml" => "@C:\\Users\\TaiPham\\Documents\\GitHub\\campaignAuthoringTool\\xmlCampaign.xml");
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