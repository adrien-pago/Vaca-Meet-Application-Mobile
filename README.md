# Application_Camping

**Contexte**   
Les campings sont souvent des lieux où les vacanciers cherchent à se détendre et à s'amuser. Cependant, bon nombre d'entre eux se retrouvent souvent isolés et n’osent pas proposer d’activités aux autres vacanciers afin de faire aussi des rencontres. Ou parfois même ils ne connaissent pas les diverses activités proposées au sein du camping. L'objectif de cette application est de dynamiser les activités du camping et de faciliter les rencontres entre vacanciers, en permettant aux vacanciers de proposer eux même des activités et d'inviter d'autres vacanciers à y participer. En plus des activités déjà mises en place par l’équipe d’animation du camping.  

**I) Cahier des Charges de l’application client pour les campings**

**I) 1. Objectifs Principaux** 
Permettre aux gérants de campings de se créer un compte pour se connecter à l’application web
Permettre au camping de gérer sa liste d’activité de son camping
Permettre au camping de gérer sa liste de structure de son camping
Permettre au camping de gérer son planning d’animation pour son équipe d’animation
Faciliter la gestion des activité proposé par le camping pour les vacanciers
  
**I) 2. Fonctionnalités**

**I) 2.1 Écran de connexion à l’application client pour les campings**
Une page simple avec pour identification nom de camping et mot de passe.
Un bouton connexion pour accéder à l’application.
Un bouton création de compte pour permettre au camping de se créer un compte à l’aide d’une fenêtre pop-up.
Pop-up de création de compte:
Un formulaire de création avec nom de camping, mot de passe, adresse email, N°  de Siret.
Une vérification avec un jeton Token envoyer par email pour confirmer l’inscription.
stocker seulement le hash du mot de passe en base de donnée.

**I) 2.2 Écran de paramétrage pour la gestion des (Activités, Structure, Plannings animations)**
Identification par camping
Permettre de gérer la listes des activités avec une table (Ajout / modification / suppression)
Permettre de gérer la listes des structures avec une table (Ajout / modification / suppression
Permettre de gérer et d’afficher le planning semaine des animations proposé par le camping
Permettre la modification du mot de passe qui sera utilisé par les vacanciers pour l’application mobile

**I) 3. Interface**
Design moderne et responsive adapté aux différents formats d’écran d’ordinateurs.
Charte graphique à respecter

**I) 4. Sécurité** 
Stockage sécurisé des données des camping
Protection contre les failles de sécurité courantes :
	protection contre les injections SQL
	protection contre les injections XXS
	protection contre les attaques CSRF

**I) 5. Maintenance et Mises à jour** 
Intégrer les mises à jour directement sur le serveur qui héberge l’application.
Support pour les campings en cas de problèmes (plateforme de Ticketing pour gérer les incidents au cas par cas)

**II) Cahier des Charges de l’application mobile pour les vacanciers**

**II) 1. Objectifs Principaux**
Permettre aux vacanciers de consulter le planning d'animation du camping ou bien les activités proposés par les vacanciers.
Permettre à un vacancier de proposer une activité pour les autres vacanciers sur le planning vacancier.
Permettre aux vacanciers de de montrer leur intérêt pour une activité proposé par un autre vacancier avec une émotte de pouce en l’air.
Dynamiser les activités au sein du camping
Faciliter l’échange et les rencontres entre les vacanciers  
 
**II) 2. Fonctionnalités**

**II) 2.1 Inscription / Connexion des vacanciers**
Une page simple avec pour identification un nom et un mot de passe pour se connecter à l’application mobile Vaca-Meet.
Un bouton connexion pour accéder à l’application.
Un bouton création de compte pour permettre à l’utilisateur de se créer un compte à l’aide d’une fenêtre pop-up.
Pop-up de création de compte:
Un formulaire de création avec nom, mot de passe, adresse email.
Une vérification avec un jeton Token envoyer par email pour confirmer l’inscription.
stocker seulement le hash du mot de passe en base de donnée.

**II) 2.2 Ecran d’accueil de l’application Vaca-Meet**
Afficher le nom du profil connecté.
Mettre une combo pour permettre à l’utilisateur de choisir un camping.
Rajouter un champ de saisi mot de passe en dessous de la combo.
Bouton de connexion qui permet d’accéder au information du camping sélectionné avec le bon mot de passe.

**II) 2.3 Ecran d’accueil du camping choisi**
Afficher le nom du camping.
Bouton qui permet à l’utilisateur de visualisé le planning semaine d’animation du camping.
L’utilisateur peut modifier les date de début et fin pour avoir les différents plannings.
Un autre bouton qui permet à l’utilisateur de voir les activités proposé par les autres vacancier sur un jours choisi.
L’utilisateur peut choisir le jours de consultation des activités proposé par les vacanciers.
L’utilisateur peut montrer son intérêt pour une activité proposé qui lui plaît en mettant un « Pouce en l’air  »
L’utilisateur peut lui-même proposé une activité avec un bouton qui ouvre une fenêtre pop-up.

Fenêtre pop-up , formulaire de proposition d’activité :
Description de l’activité dans un champ texte
Date et heure de l’activité dans un champ date

**II) 2.4 Notifications**
Notifications en temps réel pour les vacanciers lorsqu'une nouvelle activité est proposée. (En option)
Notification pour le créateur de l'activité lorsque quelqu'un vote pour son activité
Notification de rappel pour les vacanciers qui ont voté pour une activité  1h avant le début de l’activité


**II)2.5 Profil Utilisateur**
Les vacanciers peuvent voir et éditer leur profil (Modifier nom, mot de passe, Photo de profil).
Affichage des activités proposé par le vacancier avec pour information (Description de l’activité, Nom du camping et date)

**II)2.6 Système de Feedback**
Récupérer les statistiques suivante :
Les activités avec le plus de vote.
Les campings où les vacanciers propose le plus d’activités.

**II) 3. Interface**
Design moderne et responsive adapté aux différents formats d’écran de téléphone.
Charte graphique  à respecter

**II) 4. Sécurité**
Stockage sécurisé des données des vacanciers
Utilisation du Framework React Nactive et des ces protections
Protection contre les failles de sécurité courantes:
	protection contre les injection SQL
	protection contre les injection XXS
	protection contre les attaque CSRF

**II) 5. Maintenance et Mises à jour**
Intégrer les mises à jour directement sur le serveur qui héberge l’application.
Support pour les vacancier en cas de problèmes (plateforme de Ticketing pour gérer les incident au cas par cas)

**Informations supplémentaires nécessaires**
- Rendre l’application web payante pour les gérant de camping et laisser l’application mobile gratuite
- Planifier totalement le temps, le coût, pour finir le développement complet de l'application mobile ? Et finaliser l’application Web pour la rendre commercial.

 