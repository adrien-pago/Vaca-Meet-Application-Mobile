<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$idRoomEvent = isset($data['idRoomEvent']) ? $data['idRoomEvent'] : null;
$action = isset($data['action']) ? $data['action'] : null;

// Validation des données
if (empty($idRoomEvent) || empty($action)) {
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants']);
    exit();
}

// Mettre à jour le nombre de votes en fonction de l'action de l'utilisateur
if ($action === 'upvote') {
    $sql = "UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN + 1 WHERE ID_ROOM_EVENT = ?";
} elseif ($action === 'downvote') {
    $sql = "UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN - 1 WHERE ID_ROOM_EVENT = ?";
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
if ($stmt->affected_rows >= 0) {
    // Récupérer le nombre de votes mis à jour
    $sql = "SELECT NB_VACA_JOIN FROM ROOM_EVENT WHERE ID_ROOM_EVENT = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $idRoomEvent);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $nbVacaJoin = $row['NB_VACA_JOIN'];
        echo json_encode(['status' => 'success', 'message' => 'Nombre de votes mis à jour avec succès', 'nbVacaJoin' => $nbVacaJoin]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la récupération du nombre de votes']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune ligne mise à jour']);
}

// Fermeture de la connexion
$stmt->close();
$conn->close();

