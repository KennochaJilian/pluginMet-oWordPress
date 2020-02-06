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

Mardi 4/02

- Dans mon fichier météo.php, j'ai manipulé l'affichage, et le paramètrage du widget administration pour que l'admin puisse choisir une ville par défaut
- J'ai selectionné l'api OpenWheather qui prend aussi bien en paramètre le nom d'une ville que des coordonnées GPS ce qui convient aux deux possibilités 
que le client peut me renvoyer
- En JS, j'ai commencé au brouillon a faire des requêtes API et à traiter les données en les affichant sommairement dans le widget sur la page d'accueil.

Mercredi 5/02

- J'ai rencontré plusieurs problèmes/ choses qui me chagrinent : j'ai deux fonctions qui font actuellement la même chose : rêquete API à openwheather map, mais elles ont deux paramètres différents l'une prend une ville en paramètre l'autre des coordonnées GPS. L'utilisateur a chaque rechargement de page fait une requête API. Et lors du rechargement de la page pendant un court laps de temps, le widget n'affiche rien
- Plusieurs axes de recherches : j'ai pensé à faire des cookies en JS qui contiendrait les resultats de la recherche pendant quelques temps/ Local Storage en JS 
- J'envisage de faire une reqûete API directement en PHP avec la ville par défaut afin que l'utlisateur ne voit pas de champs vide pendant le chargement

Jeudi 06/02

- J'ai fait des recherches sur localStorage JS (W3School, AlsaCréation), j'ai modifié ma requête API pour qu'elle me renvoie du texte que je stocke du coup dans le local Storage, et quand j'ai besoin des données et de les afficher : du coup je les recupère et je les parse en JSON pour pouvoir les traiter. J'ai crée une fonction qui ne fait qu'afficher les données stockées.  