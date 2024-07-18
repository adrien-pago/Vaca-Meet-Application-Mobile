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

if (empty($idCamping) || empty($dateStr) || empty($userId)){ 
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants ou invalides']);
    exit();
}

$query = "SELECT v.nom, r.libelle as LIBELLE_EVENT_ROOM, r.date_time_event as DATE_TIME_EVENT, r.nb_vaca as NB_VACA, r.id_room_event as ID_ROOM_EVENT, 
          CASE WHEN (SELECT COUNT(*) FROM ROOM_EVENT_PARTICIPANTS WHERE id_vaca = ? AND id_room_event = r.id_room_event) > 0 THEN 'upvote' ELSE 'none' END AS STATUT_VOTE 
          FROM COMPTE_VACA_MEET v, ROOM_EVENT r, CAMPING c 
          WHERE c.id_camping = ? AND c.id_camping = r.id_camping AND v.idCompteVaca = r.id_compte_vaca 
          AND DATE(r.date_time_event) = ?";

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
    $row['DATE_TIME_EVENT'] = date('Y-m-d H:i:s', strtotime($row['DATE_TIME_EVENT']));
    $activities[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $activities]);

$stmt->close();
$conn->close();
