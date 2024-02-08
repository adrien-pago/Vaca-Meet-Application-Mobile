<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit;
}

// Récupérer les données envoyées par le frontend
$idRoomEvent = isset($_POST['idRoomEvent']) ? $_POST['idRoomEvent'] : null;
$action = isset($_POST['action']) ? $_POST['action'] : null; // 'upvote' ou 'downvote'

// Validation des données
if (empty($idRoomEvent) || empty($action)) {
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants']);
    exit();
}

// Connexion à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit();
}

// Mettre à jour le nombre de votes en fonction de l'action de l'utilisateur
if ($action === 'upvote') {
    $sql = "UPDATE ROOM_EVENT SET NB_VACA = NB_VACA + 1 WHERE ID_ROOM_EVENT = ?";
} elseif ($action === 'downvote') {
    $sql = "UPDATE ROOM_EVENT SET NB_VACA = NB_VACA - 1 WHERE ID_ROOM_EVENT = ?";
}

// Préparation de la requête
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit();
}

// Liaison des paramètres et exécution de la requête
$stmt->bind_param('i', $idRoomEvent);
$stmt->execute();

// Vérification du succès de la mise à jour
if ($stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Nombre de votes mis à jour avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune ligne mise à jour']);
}

// Fermeture de la connexion
$stmt->close();
$conn->close();
?>
