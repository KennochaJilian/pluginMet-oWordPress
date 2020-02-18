<?php

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
include($path.'wp-load.php');


$current_user = wp_get_current_user();
$id = $current_user->ID;
$cityUser = $current_user -> user_city; 
$prefTemp = $_GET['temp'];
$prefCity = $_GET['city']; 


if(!isset($current_user->user_temp)){
   add_user_meta( $id, 'user_temp', $prefTemp);

}elseif($current_user->user_temp !== $_GET['temp']){

  update_user_meta($id, 'user_temp', $prefTemp); 


}

if(!isset($current_user->user_city)){
   $prefCity = [$_GET['city']]; 
   add_user_meta( $id, 'user_city', $prefCity);
} 
elseif(!in_array($prefCity, $cityUser)){
   array_push($cityUser, $prefCity); 
   update_user_meta($id, 'user_city', $cityUser); 


}