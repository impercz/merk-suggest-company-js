<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', '0');

# !!!!Change it by your Authorization token!!!!!
$token = "O9qQGL7NBg6hhN5miS5yr0759oM1Zh92";

$api_url = "https://api.merk.cz:443/";
$api_method = "suggest";


function return_empty(){
  echo "[]";
  exit;
}
if($_GET == NULL){
  return_empty();
}


$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Authorization: Token ".$token
  )
);
$context = stream_context_create($opts);

$results = file_get_contents($api_url.$api_method.'?'.http_build_query($_GET), false, $context);

if($results)
  echo $results;
else
  return_empty();


?>