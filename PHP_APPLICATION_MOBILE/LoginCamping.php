<?php
// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Connexion à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Récupération des données envoyées
$postData = json_decode(file_get_contents('php://input'), true);
$nomCamping = $postData['nomCamping'];
$mdpVacancier = $postData['password'];

// Préparation de la requête pour vérifier les informations
$stmt = $conn->prepare("SELECT * FROM CAMPING WHERE NOM_CAMPING = ? AND MDP_VACNCIER = ?");
$stmt->bind_param("ss", $nomCamping, $mdpVacancier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(array("status" => "success", "message" => "Connexion réussie"));
} else {
    echo json_encode(array("status" => "error", "message" => "Informations incorrectes"));
}

$conn->close();
?>
