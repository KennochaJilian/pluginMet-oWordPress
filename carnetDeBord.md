Carnet de Bord - Aranxa CODINA
Plugin météo Wordpress, projet d'école : ACS Strasboug 2019/2020

Mercredi 29 janvier - Vendredi 31 janvier : 
Découverte de Wordpress et des plugins : 
- Tutoriel thème wordpress et plugin
- Lecture de la documentation wordpress
- J'ai réfléchi à la structure du plugin simplifiée, et l'arborescence des événements possible : 
        - Si le client choisit de ne pas partager sa position, ou que celle-ci n'est pas accessible alors on devra utiliser une ville par défaut
        - Et en fonction de ça faire une requête API (c'est à ce moment là que j'ai décidé de le faire en JS Vanilla)
- J'ai décidé de commencer en objet le plugin Wordpress afin de sécuriser un maximum l'accès au plugin
- J'ai voulu ajouter la possibilité à l'administrateur de modifier grâce à un widget le contenu du plugin

Mardi 3/02

- Dans mon fichier météo.php, j'ai manipulé l'affichage, et le paramètrage du widget administration pour que l'admin puisse choisir une ville par défaut
- J'ai selectionné l'api OpenWheather qui prend aussi bien en paramètre le nom d'une ville que des coordonnées GPS ce qui convient aux deux possibilités 
que le client peut me renvoyer
- En JS, j'ai commencé au brouillon a faire des requêtes API et à traiter les données en les affichant sommairement dans le widget sur la page d'accueil.  
