<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

// Création de la connexion à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit(); // Utilisation de exit pour arrêter le script en cas d'erreur
}

// Récupération des paramètres GET et validation
$idCamping = isset($_GET['idCamping']) ? (int)$_GET['idCamping'] : null;
$dateStr = isset($_GET['date']) ? $_GET['date'] : null;

// Validation des entrées
if (empty($idCamping) || empty($dateStr)) {
    echo json_encode(['status' => 'error', 'message' => 'Paramètres idCamping ou date manquants ou invalides']);
    exit();
}

// Préparation de la requête
$query = "SELECT v.NOM, r.LIBELLE_EVENT_ROOM, r.DATE, r.HEURE, r.NB_VACA_JOIN  FROM COMPTE_VACA_MEET v,  ROOM_EVENT r, CAMPING c 
WHERE c.ID_CAMPING = ? AND c.ID_CAMPING = r.ID_CAMPING  AND v.ID_VACA = r.ID_VACA_INIT 
AND DATE(r.DATE) = ?";

// Exécution de la requête
$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit();
}

$stmt->bind_param('is', $idCamping, $dateStr);
$stmt->execute();
$result = $stmt->get_result();

// Construction et envoi de la réponse JSON
$activities = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $activities[] = $row;
    }
    echo json_encode(['status' => 'success', 'data' => $activities]);
} 

// Fermeture de la connexion
$conn->close();
?>
