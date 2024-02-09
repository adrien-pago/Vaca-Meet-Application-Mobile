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

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$userId = isset($input['userId']) ? $input['userId'] : null;
$activityId = isset($input['activityId']) ? $input['activityId'] : null;
$action = isset($input['action']) ? $input['action'] : null;

// Validation des données
if (empty($userId) || empty($activityId) || empty($action)) {
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants']);
    exit();
}

// Vérifier si l'utilisateur a déjà voté pour cette activité
$stmt = $conn->prepare("SELECT * FROM VOTE_STATE WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
$stmt->bind_param("ii", $userId, $activityId);
$stmt->execute();
$result = $stmt->get_result();
$hasVoted = $result->num_rows > 0;

// Si l'utilisateur a déjà voté, effectuer une mise à jour, sinon insérer un nouvel enregistrement
if ($hasVoted) {
    $sql = "UPDATE VOTE_STATE SET VOTE_STATE = ? WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?";
} else {
    $sql = "INSERT INTO VOTE_STATE (ID_VACA, ID_ROOM_EVENT, VOTE_STATE) VALUES (?, ?, ?)";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param('iis', $userId, $activityId, $action);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Opération réussie']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune ligne mise à jour']);
}

$stmt->close();
$conn->close();



