<?php
header('Content-Type: application/json');

// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => "La connexion à la base de données a échoué " . $conn->connect_error]));
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$userId = isset($input['userId']) ? $input['userId'] : null;
$activityId = isset($input['activityId']) ? $input['activityId'] : null;

// Vérifier si l'utilisateur a déjà voté pour cette activité
$selectStmt = $conn->prepare("SELECT VOTE_STATE FROM VOTE_STATE WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
$selectStmt->bind_param("ii", $userId, $activityId);
$selectStmt->execute();
$selectStmt->store_result();
$selectStmt->bind_result($voteState);
$selectStmt->fetch();
$selectStmt->close();


if ($selectStmt->num_rows === 0) {
    // L'utilisateur n'a jamais voté, insérer un nouveau vote avec 'upvote'
    $insertStmt = $conn->prepare("INSERT INTO VOTE_STATE (ID_VACA, ID_ROOM_EVENT, VOTE_STATE) VALUES (?, ?, 'upvote')");
    $insertStmt->bind_param("ii", $userId, $activityId);
    if ($insertStmt->execute()) {
        $insertStmt->close();
        
        // Mettre à jour NB_VACA_JOIN dans la table ROOM_EVENT
        $updateStmt = $conn->prepare("UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN + 1 WHERE ID_ROOM_EVENT = ?");
        $updateStmt->bind_param("i", $activityId);
        if ($updateStmt->execute()) {
            $updateStmt->close();
            echo json_encode(['status' => 'success', 'message' => 'Opération réussie']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du nombre de votes: ' . $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'insertion du vote: ' . $conn->error]);
    }
} elseif ($voteState === 'upvote') {
    // L'utilisateur a déjà voté 'upvote', mettre à jour le vote à 'downvote'
    $updateStmt = $conn->prepare("UPDATE VOTE_STATE SET VOTE_STATE = 'downvote' WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
    $updateStmt->bind_param("ii", $userId, $activityId);
    if ($updateStmt->execute()) {
        $updateStmt->close();
        
        // Mettre à jour NB_VACA_JOIN dans la table ROOM_EVENT
        $updateStmt = $conn->prepare("UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN - 1 WHERE ID_ROOM_EVENT = ?");
        $updateStmt->bind_param("i", $activityId);
        if ($updateStmt->execute()) {
            $updateStmt->close();
            echo json_encode(['status' => 'success', 'message' => 'Opération réussie']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du nombre de votes: ' . $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du vote: ' . $conn->error]);
    }
} elseif ($voteState === 'downvote') {
    // L'utilisateur a déjà voté 'downvote', mettre à jour le vote à 'upvote'
    $updateStmt = $conn->prepare("UPDATE VOTE_STATE SET VOTE_STATE = 'upvote' WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
    $updateStmt->bind_param("ii", $userId, $activityId);
    if ($updateStmt->execute()) {
        $updateStmt->close();
        
        // Mettre à jour NB_VACA_JOIN dans la table ROOM_EVENT
        $updateStmt = $conn->prepare("UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN + 1 WHERE ID_ROOM_EVENT = ?");
        $updateStmt->bind_param("i", $activityId);
        if ($updateStmt->execute()) {
            $updateStmt->close();
            echo json_encode(['status' => 'success', 'message' => 'Opération réussie']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du nombre de votes: ' . $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du vote: ' . $conn->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur inattendue: voteState indéfini']);
    echo($voteState);
}

$conn->close();
?>
