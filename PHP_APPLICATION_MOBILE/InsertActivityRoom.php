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
$date = isset($_POST['date']) ? $_POST['date'] : null;
$heure = isset($_POST['heure']) ? $_POST['heure'] : null;
$libelle = isset($_POST['libelle']) ? $_POST['libelle'] : null; 

$sql = "INSERT INTO ROOM_EVENT (ID_VACA_INIT, ID_CAMPING, DATE_EVENT_ROOM, HEURE, LIBELLE_EVENT_ROOM, NB_VACA_JOIN) VALUES (?, ?, ?, ?, ?,0)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit;
}

// Ajustez les variables à lier en fonction de la requête corrigée
$stmt->bind_param("iisss", $idVacaInit, $idCamping, $date, $heure, $libelle);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Activité ajoutée avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout de l\'activité: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
