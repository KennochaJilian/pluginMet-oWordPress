<?php 

if(!defined(('WP_UNINSTALL_PLUGIN'))){

    die(); 

}

// Clear Database Store Data

$villes = get_posts(array('post_type' => 'villes', 'numberposts' => -1 )); 

foreach($villes as $ville ){

    wp_delete_post($ville-> ID, true); 

}