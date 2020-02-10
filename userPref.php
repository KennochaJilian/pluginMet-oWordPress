

<?php
if(!function_exists('wp_delete_user')) {
   include_once("/home/aranxa/www/wordpress/wp-admin/includes/user.php");
   include_once('/home/aranxa/www/wordpress/wp-includes/pluggable.php');
}

 $current_user = wp_get_current_user();

   //  echo 'Username: ' . $current_user->user_login . '<br />';
   //  echo 'User email: ' . $current_user->user_email . '<br />';
   //  echo 'User first name: ' . $current_user->user_firstname . '<br />';
   //  echo 'User last name: ' . $current_user->user_lastname . '<br />';
   //  echo 'User display name: ' . $current_user->display_name . '<br />';
   //  echo 'User ID: ' . $current_user->ID . '<br />';
