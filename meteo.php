<?php
/*
Plugin Name: Météo
Plugin URI: https://mon-siteweb.com/
Description: Ceci est mon premier plugin
Author: Aranxa
Version: 0.1
Author URI: aranxa.codina.ovh
*/

if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

class MeteoPlugin 
{
	function __construct(){
		add_action('init', array($this, 'custom_post_type')); 
	}

	function register(){
		// echo 'toto';
		// die();
		add_action( 'wp_enqueue_scripts', array ( $this, 'enqueue'));
	
	}

	function activate(){
		//generated a CPT (Custom Post Type)
		$this->custom_post_type();
		// flush rewrite rules
		flush_rewrite_rules();
		

	}

	function deactivate(){
		// flush rewrite rules
		flush_rewrite_rules();
		

	}

	function custom_post_type(){

		register_post_type('villes', ['public' => true, 'label' => 'Villes']);
	}

	function enqueue(){
		
		//enqueue all our scripts
		wp_enqueue_style('styleMeteo', plugins_url('/assets/style.css', __FILE__));
		wp_enqueue_script('scriptMeteo', plugins_url('/assets/app.js', __FILE__)); 

	}

}

if(class_exists('MeteoPlugin')){
	$meteoPlugin = new MeteoPlugin(); 
	$meteoPlugin->register();

}

// activation

register_activation_hook(__FILE__, array($meteoPlugin, 'activate')); 

// deactivation

register_deactivation_hook(__FILE__, array($meteoPlugin, 'deactivate')); 

// Création du widget: 

add_action( 'widgets_init' , 'articleRecents_init' );

function articleRecents_init() {
	register_widget("widgetArticleRecents");

}


class widgetArticleRecents extends WP_Widget { 

// Constructeur du widgets 
function widgetArticleRecents() { 
parent::WP_Widget('AAF', $name = 'A.météo', array('description' => 'Affichage de la météo du jour')); 
}

//  Mise en forme 
function widget($args,$instance) { 
	
	extract($args); 

	$title = apply_filters('widget_title', $instance['title']); 
	$defaultCity = $instance['city']; 
	
	//Récupération des articles 
	
	//$lastposts = get_posts(array('numberposts'=>$nb_posts)); 

// HTML AVANT WIDGET 
	echo $before_widget;
 
// Titre du widget qui va s’afficher 
	echo $before_title.$title.$after_title; ?>


	<p> <?= date(" d n Y")?> </p>

	 <ul>
		<li id="city"><?=$instance['city']?></li>
		<li id="temperature"> Température : </li>
		<li id="meteo"> Météo : </li> 
	</ul>
	<button id="celsius"> °C </button>
	<button id="fahrenheit"> °F </button>

	<form action="#" id="selectCity">

	<input id="toto" placeholder="<?=$instance['city']?>"></imput>
	<button type=submit>Valider ! </button>
	</form>
	


<!--  HTML APRES WIDGET  -->
<?php echo $after_widget; 
}

// Récupération des paramètres 
function update($new_instance, $old_instance) { 

	
		$instance = $old_instance; 

//Récupération des paramètres envoyés 
		$instance['title'] = strip_tags($new_instance['title']); 
		$instance['city'] = $new_instance['city']; return $instance; 


} 


// Paramètres dans l’administration 
function form($instance) { 

// Etape 1 - Définition des variables titre et nombre de post 
$title = esc_attr($instance['title']); 
$nb_posts = esc_attr($instance['city']); 

// Etape 2 - Ajout des deux champs
?> 

	<p> 
		<label for="<?php echo $this->get_field_id('title'); ?>"> 
			<?php echo 'Titre:'; ?> 
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" /> 
		</label> 
	</p> 

	<p> 
		<label for="<?php echo $this->get_field_id('city'); ?>"> 
			<?php echo 'Ville par défaut'; ?> <input class="widefat" id="<?php echo $this->get_field_id('city'); ?>" name="<?php echo $this->get_field_name('city'); ?>" type="text" value="<?php echo $nb_posts; ?>" /> 
		</label> 
	</p> 

<?php 

}

// Fin du widget 
}
