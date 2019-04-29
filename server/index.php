<?php error_reporting(0);
/* Example Merk API Suggest proxy script */



# Update the following with your Authorization token (see https://www.merk.cz/api/about/):
$token = "0123456789abcdef0123456789abcdef";



$api_url = "https://api.merk.cz:443/suggest/";
$request = curl_init($api_url . '?' . http_build_query($_GET));
curl_setopt($request, CURLOPT_HTTPHEADER, array("Authorization: Token " . $token));
curl_setopt($request, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

$data = curl_exec($request);
$status = curl_getinfo($request, CURLINFO_HTTP_CODE);

curl_close($request);

http_response_code($status);
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $data;
