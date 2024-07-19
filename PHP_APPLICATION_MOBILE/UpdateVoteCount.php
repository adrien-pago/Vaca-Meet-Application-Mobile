<?php
header('Content-Type: application/json');

require_once 'config.php';

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => "La connexion à la base de données a échoué: " . $conn->connect_error]));
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$userId = isset($input['userId']) ? $input['userId'] : null;
$activityId = isset($input['activityId']) ? $input['activityId'] : null;

if (!$userId || !$activityId) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid parameters.']);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT id_vaca FROM PARTICIPANT_ROOM_EVENT WHERE id_vaca = ? AND id_room_event = ?");
    $stmt->bind_param("ii", $userId, $activityId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // L'utilisateur participe déjà, on le retire
        $stmt = $conn->prepare("DELETE FROM PARTICIPANT_ROOM_EVENT WHERE id_vaca = ? AND id_room_event = ?");
        $stmt->bind_param("ii", $userId, $activityId);
        $stmt->execute();

        $action = 'downvote';
    } else {
        // L'utilisateur ne participe pas encore, on l'ajoute
        $stmt = $conn->prepare("INSERT INTO PARTICIPANT_ROOM_EVENT (id_vaca, id_room_event) VALUES (?, ?)");
        $stmt->bind_param("ii", $userId, $activityId);
        $stmt->execute();

        $action = 'upvote';
    }

    // Récupérer le nouveau nombre de participants
                          
    $stmt = $conn->prepare("SELECT COUNT(*) as NB_VACA_JOIN FROM PARTICIPANT_ROOM_EVENT WHERE id_room_event = ?");
    $stmt->bind_param("i", $activityId);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->fetch_assoc();

    $response = [
        'status' => 'success',
        'data' => [
            'NB_VACA_JOIN' => $count['NB_VACA_JOIN'],
            'STATUT_VOTE' => $action
        ]
    ];

    echo json_encode($response);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
