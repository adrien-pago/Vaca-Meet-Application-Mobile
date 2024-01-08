<?php
header('Content-Type: application/json');

// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => "La connexion à la base de données a échoué " . $conn->connect_error]));
}

// Récupérer les données envoyées par l'application
$data = json_decode(file_get_contents('php://input'), true);
$nomCamping = $data['nomCamping'] ?? null;
$password = $data['password'] ?? null;

// Vérifier que les données nécessaires sont présentes
if (!$nomCamping || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Nom de camping ou mot de passe non fourni.']);
    exit();
}

// Requête pour vérifier les informations de connexion
$stmt = $conn->prepare("SELECT ID_CAMPING, NOM_CAMPING FROM CAMPING WHERE NOM_CAMPING=? AND MDP_VACANCIER=?");

// Vérifier si la préparation de la requête a réussi
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => "Échec lors de la préparation de la requête : " . $conn->error]);
    exit();
}

// Associer les paramètres et exécuter la requête
$stmt->bind_param("ss", $nomCamping, $password);
$stmt->execute();

// Récupérer les résultats
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Authentification réussie
    echo json_encode(['status' => 'success', 'message' => 'Connexion réussie.']);
} else {
    // Authentification échouée
    echo json_encode(['status' => 'failed', 'message' => 'Nom de camping ou mot de passe incorrect.']);
}

$stmt->close();
$conn->close();
?>
