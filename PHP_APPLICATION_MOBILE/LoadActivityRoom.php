<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué']);
    exit(); 
}

$idCamping = $_GET['idCamping'];
$date = $_GET['date'];
$userId = $_GET['userId'];

$response = [];

if (!isset($idCamping) || !isset($date) || !isset($userId)) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid parameters.';
    echo json_encode($response);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT
            re.id_room_event AS ID_ROOM_EVENT,
            re.libelle AS LIBELLE_EVENT_ROOM,
            re.date_time_event AS DATE_TIME_EVENT,
            cv.nom AS NOM,
            re.nb_vaca AS NB_VACA,
            IF(pr.id_vaca IS NOT NULL, 'upvote', 'none') AS STATUT_VOTE
        FROM
            ROOM_EVENT re
        JOIN
            COMPTE_VACA_MEET cv ON re.id_compte_vaca = cv.idCompteVaca
        LEFT JOIN
            PARTICIPANT_ROOM_EVENT pr ON re.id_room_event = pr.id_room_event AND pr.id_vaca = ?
        WHERE
            re.id_camping = ? AND DATE(re.date_time_event) = ?
        ORDER BY
            re.date_time_event
    ");
    $stmt->bind_param("iis", $userId, $idCamping, $date);
    $stmt->execute();
    $result = $stmt->get_result();
    $activities = $result->fetch_all(MYSQLI_ASSOC);

    if ($activities) {
        $response['status'] = 'success';
        $response['data'] = $activities;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'No activities found.';
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>
