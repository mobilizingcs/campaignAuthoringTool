<?php
    $xmlFile = "xmlCampaign.xml";
    $fh = fopen($xmlFile, 'w');
    fwrite($fh, $_POST["xml"]);
    fclose($fh);

    $url = "https://test.ohmage.org/app/campaign/create";
    $ch = curl_init($url);
    
    $data = array("auth_token" => $_POST["auth_token"],
        "client" => $_POST["client"],
        "running_state" => $_POST["running_state"],
        "privacy_state" => $_POST["privacy_state"],
        "class_urn_list" => $_POST["class_urn_list"],
        "xml" => "@xmlCampaign.xml");

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
     
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
?>