<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit;
}

$id_vaca_init = $_POST['id_vaca_init'];
$id_camping = $_POST['id_camping'];
$id_activite = $_POST['id_activite'];
$heure_debut = $_POST['heure_debut'];
$heure_fin = $_POST['heure_fin'];
$nb_place = $_POST['nb_place'];

$sql = "INSERT INTO ROOM_EVENT (ID_VACA_INIT, ID_ACTIVITE, HEURE_DEBUT, HEURE_FIN, NB_PLACE, ID_CAMPING) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête']);
    exit;
}

$stmt->bind_param("iisssi", $id_vaca_init, $id_activite, $heure_debut, $heure_fin, $nb_place, $id_camping);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Activité ajoutée avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout de l\'activité']);
}

$stmt->close();
$conn->close();
?>
