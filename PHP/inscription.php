<?php
// Configuration de la base de données
$servername = "localhost";
$dbname = "APPLICATION_CAMPING";
$dbusername = "adrien_camping";
$dbpassword = "nu9J556~z";

// Connexion à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Récupérer les données envoyées par l'application
$data = json_decode(file_get_contents('php://input'), true);
$pseudo = $data['pseudo'];
$email = $data['email'];
$password = $data['password'];

// Hasher le mot de passe
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Générer un token pour la confirmation par email
$token = bin2hex(random_bytes(32));

// Vérifiez si l'email existe déjà
$stmt = $conn->prepare("SELECT * FROM COMPTE_VACA_MEET WHERE EMAIL = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email déjà utilisé']);
    $stmt->close();
    $conn->close();
    exit();
}

// Insérer le nouvel utilisateur
$stmt = $conn->prepare("INSERT INTO COMPTE_VACA_MEET (PSEUDO, MDP, EMAIL, TOKEN) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $pseudo, $hashed_password, $email, $token);
if ($stmt->execute()) {
    // TODO: Envoyer l'email de confirmation ici...
    echo json_encode(['status' => 'success', 'message' => "Inscription réussie. Vérifiez votre email pour confirmer."]);
} else {
    echo json_encode(['status' => 'error', 'message' => "Erreur lors de l'inscription"]);
}

$stmt->close();
$conn->close();
?>
