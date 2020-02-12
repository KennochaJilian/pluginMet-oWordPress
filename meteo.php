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

if(!function_exists('wp_get_current_user')) {
    include(ABSPATH . "wp-includes/pluggable.php"); 
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



// $json = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=Strasbourg&lang=en&units=metric&appid=429fff953abdff0e572a066c8b792ac1"); 
// $parse = json_decode($json); 
// var_dump($parse); 



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
	$defaultUnit = $instance['unit'];
// Appel à l'API pour affichage personnalisé : 

$current_user = wp_get_current_user();
$id = $current_user -> $ID;
$prefCityUser = $current_user -> user_city;
 
if($id !== false  ){
	
	$json = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=".$prefCityUser."&lang=en&units=metric&appid=429fff953abdff0e572a066c8b792ac1");
	$result = json_decode($json);
	$jsonForecast = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?q=".$prefCityUser."&lang=en&units=metric&appid=429fff953abdff0e572a066c8b792ac1");
	$resultForecast = json_decode(($jsonForecast)); 

} else{

	$json = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=".$defaultCity."&lang=en&units=".$defaultUnit."&appid=429fff953abdff0e572a066c8b792ac1");
	$jsonForecast = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?q=".$defaultCity."&lang=en&units=".$defaultUnit."&appid=429fff953abdff0e572a066c8b792ac1"); 
	$result = json_decode($json);
	$resultForecast = json_decode(($jsonForecast)); 

}

function writeTemp($temp, $unit){
	
	if($unit == "metric"){ 
		ob_start(); ?>
		<div> <p class="temperature"><?=$temp?>°C</p> </div>
		<?php $tempWrote = ob_get_clean(); 
		return $tempWrote; 

	} elseif($unit == "imperial") { 
		ob_start(); ?>
		<div> <p class="temperature"><?=$temp?>°F</p> </div>
		<?php $tempWrote = ob_get_clean(); 
		return $tempWrote; 

	} else { 
		ob_start(); ?>
		<div> <p class="temperature"><?=$temp?>°K</p> </div>
		<?php $tempWrote = ob_get_clean(); 
		return $tempWrote; 
	}

} 

// HTML AVANT WIDGET 
	$before_widget;
 
// Titre du widget qui va s’afficher 
	echo $before_title.$title.$after_title;
	var_dump($prefCityUser); 
	$weather = $result -> weather[0] -> description; 
	$temp = round($result -> main -> temp); 
	$weatherJ1 = $resultForecast ->list[7] -> weather[0] -> main;
	$tempJ1 = round($resultForecast -> list[7] -> main -> temp);
	$weatherJ2 =  $resultForecast ->list[14] -> weather[0] -> main; 
	$tempJ2 =  round($resultForecast -> list[14] -> main -> temp);
	$weatherJ3 = $resultForecast ->list[21] -> weather[0] -> main;
	$tempJ3 =  round($resultForecast -> list[21] -> main -> temp);
	
	
	


if($id !== false  ){ ?>
	<p id="city"><?=$prefCityUser?></p>

<?php } else{ ?>

<p id="city"><?=$instance['city']?></p>

<?php } ?> 

	
	<p id="date"> <?= date(" l d F Y")?> </p>
	<div id="day"> 
		
	<div> <p id="temperature"><?=$temp?> °C </p> </div>
		<div id=blockImg> <p id="meteo"><?=$weather?></p></div> 
	</div>
	<?php 
	$nextDay = time() + (24 * 60 * 60);
	$nextTwoDay =  time() + (2*24 * 60 * 60);
	$nextThreeDay = time() + (3*24 * 60 * 60);
	?>
	<div id="futureDay"> 
		<div class="day"> 
			<?php echo writeTemp($tempJ1,$defaultUnit) ?>
			<div id="f1"> <p><?=$weatherJ1?></p> </div>
			<div> <p> <?=  date('d-m-Y', $nextDay)?></p></div> 
		</div>
		<div class="day"> 
			<?php echo writeTemp($tempJ2,$defaultUnit) ?>
			<div id="f2"><p><?=$weatherJ2?></p> </div>
			<div> <p> <?=  date('d-m-Y', $nextTwoDay)?></p></div>
			
		</div>
		<div class="day"> 
			<?php echo writeTemp($tempJ3,$defaultUnit) ?>
			<div id="f3"> <p><?=$weatherJ3?></p> </div>
			<div> <p> <?=  date('d-m-Y', $nextThreeDay)?></p></div>
		</div>

	</div>

	<button id="pref"> Save Pref !  </button>
	<button class="active" id="celsius"> °C</button>
	<button id="fahrenheit"> °F </button>
	


<!--  HTML APRES WIDGET  -->
<?php echo $after_widget;

}


// Récupération des paramètres 
function update($new_instance, $old_instance) { 

	
		$instance = $old_instance; 

//Récupération des paramètres envoyés 
		$instance['title'] = strip_tags($new_instance['title']); 
		$instance['city'] = $new_instance['city'];		
		$instance['unit'] = $new_instance['unit']; return $instance; 


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
	<?= $instance['unit']; ?> 
	<p> 
		<label for="<?php echo $this->get_field_id('city'); ?>"> 
			<?php echo 'Ville par défaut'; ?> <input class="widefat" id="<?php echo $this->get_field_id('city'); ?>" name="<?php echo $this->get_field_name('city'); ?>" type="text" value="<?php echo $nb_posts; ?>" /> 
		</label> 
	</p> 

	<p> 
		<label for="<?php echo $this->get_field_id('unit'); ?>"> 
			<?php echo 'Unité par défaut'; ?> 
			<select name = "<?php echo $this->get_field_name('unit');?>" id="<?php echo $this->get_field_id('unit'); ?>">
				<option value="metric"> Système métrique</option>
				<option value="imperial"> Système impérial</option>
				<option value="default"> Par défaut (Kelvin)</option>		
			</select> 
		</label> 
	</p> 

<?php 

}

// Fin du widget 
}
