<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit;
}

$idVacaInit = isset($_POST['id_vaca_init']) ? (int)$_POST['id_vaca_init'] : null;
$idCamping = isset($_POST['id_camping']) ? (int)$_POST['id_camping'] : null;
$date_time_event = isset($_POST['date_time_event']) ? $_POST['date_time_event'] : null;
$libelle = isset($_POST['libelle']) ? $_POST['libelle'] : null; 

$sql = "INSERT INTO ROOM_EVENT (id_compte_vaca, id_camping, date_time_event, libelle, nb_vaca) VALUES (?, ?, ?, ?, 0)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit;
}

$stmt->bind_param("iiss", $idVacaInit, $idCamping, $date_time_event, $libelle);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Activité ajoutée avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout de l\'activité: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
