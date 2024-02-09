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

$requete = $conn->prepare("SELECT VOTE_STATE FROM VOTE_STATE WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
$requete->bind_param("ii", $userId, $activityId);
$requete->execute();
$result = $requete->get_result(); // Utilisez get_result() pour obtenir le résultat
$voteState = null;
if ($row = $result->fetch_assoc()) {
    $voteState = $row['VOTE_STATE'];
}
$requete->close();

$updateVote = false;
$updateCount = 0;

if (is_null($voteState)) {
    // Cas 1: Utilisateur jamais voté
    $requete = $conn->prepare("INSERT INTO VOTE_STATE (ID_VACA, ID_ROOM_EVENT, VOTE_STATE) VALUES (?, ?, 'upvote')");
    $updateCount = 1; // Augmenter le compteur
} elseif ($voteState === 'upvote') {
    // Cas 2: Utilisateur a déjà voté upvote
    $requete = $conn->prepare("UPDATE VOTE_STATE SET VOTE_STATE = 'downvote' WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
    $updateCount = -1; // Diminuer le compteur
} elseif ($voteState === 'downvote') {
    // Cas 3: Utilisateur a déjà voté downvote
    $requete = $conn->prepare("UPDATE VOTE_STATE SET VOTE_STATE = 'upvote' WHERE ID_VACA = ? AND ID_ROOM_EVENT = ?");
    $updateCount = 1; // Augmenter le compteur
}

if (isset($requete)) {
    $requete->bind_param("ii", $userId, $activityId);
    if ($requete->execute()) {
        $updateVote = true;
    }
    $requete->close();
}

if ($updateVote) {
    $requete = $conn->prepare("UPDATE ROOM_EVENT SET NB_VACA_JOIN = NB_VACA_JOIN + ? WHERE ID_ROOM_EVENT = ?");
    $requete->bind_param("ii", $updateCount, $activityId);
    $requete->execute();
    $requete->close();
    
    // Récupérer le nombre de votes mis à jour
    $requete = $conn->prepare("SELECT NB_VACA_JOIN FROM ROOM_EVENT WHERE ID_ROOM_EVENT = ?");
    $requete->bind_param("i", $activityId);
    $requete->execute();
    $requete->bind_result($nbVacaJoin);
    $requete->fetch();
    $requete->close();
    
    echo json_encode(['status' => 'success', 'data' => ['NB_VACA_JOIN' => $nbVacaJoin]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du vote.']);
}

$conn->close();
