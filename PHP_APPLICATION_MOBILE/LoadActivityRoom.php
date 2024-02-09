<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit(); 
}

$idCamping = isset($_GET['idCamping']) ? (int)$_GET['idCamping'] : null;
$dateStr = isset($_GET['date']) ? $_GET['date'] : null;
$userId = isset($_GET['userId']) ? (int)$_GET['userId'] : null; 

if (empty($idCamping) || empty($dateStr) || empty($userId)) { 
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants ou invalides']);
    exit();
}

$query = "SELECT v.NOM, r.LIBELLE_EVENT_ROOM, r.DATE_EVENT_ROOM, r.HEURE, r.NB_VACA_JOIN, r.ID_ROOM_EVENT, 
(SELECT vs.VOTE_STATE FROM VOTE_STATE vs WHERE vs.ID_VACA = ? AND vs.ID_ROOM_EVENT = r.ID_ROOM_EVENT) AS STATU_VOTE
FROM COMPTE_VACA_MEET v, ROOM_EVENT r, CAMPING c 
WHERE c.ID_CAMPING = ? AND c.ID_CAMPING = r.ID_CAMPING AND v.ID_VACA = r.ID_VACA_INIT 
AND DATE(r.DATE_EVENT_ROOM) = ?";

$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit();
}

$stmt->bind_param('iis', $userId, $idCamping, $dateStr); 
$stmt->execute();
$result = $stmt->get_result();

$activities = [];
while ($row = $result->fetch_assoc()) {
    $row['STATU_VOTE'] = $row['STATU_VOTE'] ?? 'vide'; 
    $activities[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $activities]);

$conn->close();

