<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit();
}

$idCamping = isset($_GET['idCamping']) ? $_GET['idCamping'] : '';

$query = "SELECT e.LIB_ACTIVITE, v.NOM, r.NB_PLACE, r.HEURE_DEBUT, r.HEURE_FIN FROM COMPTE_VACA_MEET v, EVENEMENT e, ROOM_EVENT r, CAMPING c WHERE c.ID_CAMPING = $idCamping AND c.ID_CAMPING = r.ID_CAMPING AND r.ID_EVENEMENT = e.ID_EVENEMENT AND e.ID_COMPTE_VACA_MEET = v.ID_COMPTE";

$result = $conn->query($query);

$activities = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $activities[] = $row;
    }
    echo json_encode($activities);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucune activité trouvée']);
}

$conn->close();
?>
