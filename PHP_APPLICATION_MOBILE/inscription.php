<?php
// Inclure PHPMailer
require_once __DIR__ . '/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Se connecter à la base de données
require_once 'config.php';
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué " . $conn->connect_error);
}

// Récupérer les données envoyées par l'application
$data = json_decode(file_get_contents('php://input'), true);
$pseudo = $data['pseudo'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$pseudo || !$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Informations manquantes !!']);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$token = bin2hex(random_bytes(32));

$stmt = $conn->prepare("SELECT * FROM COMPTE_VACA_MEET WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email déjà utilisé']);
    $stmt->close();
    $conn->close();
    exit();
}

$base_url = "https://adrien-pago-portfolio.fr/";
$confirmation_link = $base_url . '/PHP_APPLICATION_MOBILE/confirm_Token.php?token=' . $token;

$mail = new PHPMailer(true);
$mail->SMTPDebug = 2; // Activer le débogage SMTP
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.ionos.fr';
    $mail->SMTPAuth = true;
    $mail->Username = 'support-technique@vaca-meet.fr';
    $mail->Password = 'Support-AntiHackMessagerie489?';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587; // Assurez-vous d'utiliser le bon port pour TLS

    $mail->setFrom('adrien-pago@vaca-meet.fr', 'Support Technique');
    $mail->addAddress($email);
    $mail->isHTML(true);

    $mail->Subject = 'Confirmez votre compte';
    $mail->Body    = 'Bienvenue sur notre application Camping! Veuillez cliquer sur le lien suivant pour confirmer votre compte : <a href="' . $confirmation_link . '">Confirmer mon compte</a>';

    $mail->send();
} catch (Exception $e) {
    $response_array['status'] = 'error';
    $response_array['message'] = "Le message n'a pas pu être envoyé. Erreur : {$mail->ErrorInfo}";
    echo json_encode($response_array);
    die();
}

$stmt = $conn->prepare("INSERT INTO COMPTE_VACA_MEET (nom, mdpVaca, email, tokenCompte) VALUES (?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => "Erreur de préparation " . $conn->error]);
    exit();
}

$stmt->bind_param("ssss", $pseudo, $hashed_password, $email, $token);
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => "Inscription réussie. Vérifiez votre email pour confirmer."]);
} else {
    echo json_encode(['status' => 'error', 'message' => "Erreur lors de l'inscription : " . $stmt->error]);
}

$stmt->close();
$conn->close();
