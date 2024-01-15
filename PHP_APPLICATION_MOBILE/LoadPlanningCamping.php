<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit();
}

$dateDebut = $_GET['dateDebut'] ?? null;
$dateFin = $_GET['dateFin'] ?? null;

if (!$dateDebut || !$dateFin) {
    echo json_encode(['status' => 'error', 'message' => 'Dates manquantes']);
    exit();
}

$sql = "SELECT LIB_ACTIVITE, DATE_HEURE_DEBUT, DATE_HEURE_FIN FROM EVENEMENT WHERE DATE_HEURE_DEBUT BETWEEN '$dateDebut' AND '$dateFin'";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la requête SQL']);
    $conn->close();
    exit();
}

$planning = array();
while($row = $result->fetch_assoc()) {
    $planning[] = array(
        'LIB_ACTIVITE' => $row['LIB_ACTIVITE'],
        'DATE_HEURE_DEBUT' => $row['DATE_HEURE_DEBUT'],
        'DATE_HEURE_FIN' => $row['DATE_HEURE_FIN']
    );
}

$conn->close();

echo json_encode(['status' => 'success', 'data' => $planning]);
?>