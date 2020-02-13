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

Vendredi 07/02 
- Me suis rendue compte que mon truc qui stocke ne fonctionnait pas, alors j'ai laissé tombé pour l'instant de stocker pour une durée determinée le resultat de ma requête, de ce fait ça fait une demande API à chaque fois. Tant pis on réessayera la semaine prochaine. J'ai fait des recherches concernant les visuels de mes icones de temps. Et j'ai ajouté une journée de prévision à mon plugin météo

Lundi 10/02 
- J'ai crée une fonction qui set automatiquement les images au bon endroit plutôt que de me repèter dans mon code au moment où j'écrivais en JS le temps qu'il allait faire
- Je réflechis actuellement à comment sauvegarder les préférences utilisateurs 
- Première piste : utiliser les cookies, sessions => Le problème qui risque de se poser, c'est que l'utilisateur peut perdre ses préférences en supprimant ses cookies
- Deuxième piste peut on sauvegarder les préférences de l'utilisateur connecté grâce à Wordpress et sa utiliser la BDD. 
- Utiliser un autre plugin qui sauvegarde les préférences utilisateur
- Finalement la piste fut d'utiliser la bdd de Wordpress en particulier les meta appartenant à chacun des utlisateurs. Ce qui fut compliqué c'était d'y accèder depuis un autre fichier PHP autre que celui du plugin. Je ne pouvais pas accèder aux fonctions de Wordpress quelles qu'elles soient. J'ai donc cherché sur Internet et j'ai vu qu'il y avait la possibilité d'appeler certain fichier php de WP (stack overflow: https://stackoverflow.com/questions/6127559/wordpress-plugin-call-to-undefined-function-wp-get-current-user) mais malgrè cela, ça ne fonctionnait pas. Donc après en avoir discuté avec Julien, il s'est avéré que je devais peut être faire un auto load de WP. Solution fonctionelle mais pas très propre, et déconseillée. 

Mardi 11/02
Je suis finalement partie sur la piste de sauvegarder en base de donnée pour sauvegarder les villes et les préférences de t° de l'utilisateur connecté, je me suis concentrée ce jour là sur la sauvegarde des préférences de la t°. Et surtout sur la possibilité pour l'utilisateur de modifier l'affichege de la température en °C ou °F

Mercredi 12/02 
Je voulais que l'utilsateur puisse avoir plus d'une ville enregistrée en favori, et du coup j'ai appris que je pouvais envoyer un tableau dans la base de donnée, du coup, je pouvais aussi le recupérer sous forme de tableau.
Du coup, en PHP je génère automatiquement grâce à une boucle, l'affichage des villes passées en favori par l'utilisateur. J'ai du refactorer mes id/class pour que le CSS ne se retrouve pas perdu. Et puis bon comme je suis pas si douée que ça, j'avais oublié de vider le cache. Et du coup j'ai mis du temps à comprendre pourquoi le style CSS ne s'affichait pas correctement. 
En JS, j'ai fait un slideshow pour qu'une seule ville soit affichée, et j'ai repris tout mon JS pour que celui-ci fonctionne avec le principe de class. 
Pui j'ai fini par gerer en PHP/AJAX l'envoi des préférences pour la ville affichée, et je me suis cassée la tête sur une variable qui était mal écrite lors de la mise en jour de la base de données.