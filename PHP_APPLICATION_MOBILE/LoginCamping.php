<?php
// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Préparer la requête pour éviter les injections SQL
$stmt = $conn->prepare("SELECT id, NOM_CAMPING FROM CAMPING WHERE NOM_CAMPING=? AND MDP_VACANCIER=?");

// Récupérer les données envoyées par l'utilisateur
$nomCamping = $_POST['nomCamping']; 
$password = $_POST['password']; 

// Associer les paramètres
$stmt->bind_param("ss", $nomCamping, $password);

// Exécuter la requête
$stmt->execute();

// Récupérer les résultats
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Authentification réussie
    echo json_encode(array("status" => "success", "message" => "Connexion réussie."));
} else {
    // Authentification échouée
    echo json_encode(array("status" => "failed", "message" => "Nom de camping ou mot de passe incorrect."));
}

// Fermer la déclaration
$stmt->close();

// Fermer la connexion
$conn->close();
?>
