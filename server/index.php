<?php error_reporting(0);
/* Example Merk API Suggest proxy script
 *
 * Required PHP version: PHP >= 5.4.0
 *
 */


# !!!! Change it for your Authorization token !!!!!
#$token = "Your token goes here";
$token = "BBwU4EcX7b86m3NmuRVXVEYbBQZGSQDm";



header('Access-Control-Allow-Origin: *');
$request = curl_init('https://api.merk.cz:443/suggest/?' . http_build_query($_GET));
curl_setopt($request, CURLOPT_HTTPHEADER, array("Authorization: Token " . $token));
curl_setopt($request, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($request, CURLOPT_RETURNTRANSFER, TRUE);
$data = curl_exec($request);
$status = curl_getinfo($request, CURLINFO_HTTP_CODE);
http_response_code($status); // PHP >= 5.4.0
header('Content-Type: application/json');
echo $data;
curl_close($request);
