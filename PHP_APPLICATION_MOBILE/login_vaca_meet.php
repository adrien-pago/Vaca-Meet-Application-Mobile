<?php
session_start();

require_once 'config.php'; 

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$nom = $data['nom'] ?? null;
$password = $data['password'] ?? null;

if (!$nom || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Informations manquantes']);
    exit();
}

$sql = "SELECT * FROM COMPTE_VACA_MEET WHERE NOM = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $nom);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['MDP'])) {
        if ($row['COMPTE_CONFIRME'] == 1) {
            $_SESSION['nom'] = $row['NOM'];  // Stockez le nom de l'utilisateur
            echo json_encode(['status' => 'success', 'message' => 'Vous êtes connecté avec succès.', 'id' => $row['ID']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Votre compte n\'a pas encore été confirmé. Veuillez vérifier votre boîte e-mail.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Le mot de passe est incorrect.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Le nom d\'utilisateur est incorrect.']);
}

$stmt->close();
$conn->close();
?>
