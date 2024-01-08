<?php
// Inclure PHPMailer dans votre script
require_once __DIR__ . '/../vendor/autoload.php';

// Importer PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué " . $conn->connect_error);
}

// Récupérer les données envoyées par l'application
$data = json_decode(file_get_contents('php://input'), true);
$pseudo = $data['pseudo'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

// Vérifier que les données nécessaires sont présentes
if (!$pseudo || !$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Informations manquantes']);
    exit();
}

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

//Lien de confirmation
$base_url = "http://vaca-meet.fr"; // votre domaine actuel.
$confirmation_link = $base_url . '/PHP_APPLICATION_MOBILE/confirm_Token.php?token=' . $token;

// Envoyer un e-mail de confirmation
$mail = new PHPMailer(true);
$mail->SMTPDebug = 0; // Désactiver le débogage SMTP
try {
    // Configurer les paramètres du serveur SMTP
    $mail->isSMTP();                                     
    $mail->Host = 'smtp.ionos.fr';                      
    $mail->SMTPAuth = true;                              
    $mail->Username = 'adrien-pago@vaca-meet.fr'; 
    $mail->Password = 'RG3SrzY7PhvnWQh';              
    $mail->SMTPSecure = 'tls';                           
    $mail->Port = 587;

    // Configurer les paramètres de l'e-mail
    $mail->setFrom('adrien-pago@vaca-meet.fr', 'Support Technique');
    $mail->addAddress($email);
    $mail->isHTML(true);

    $mail->Subject = 'Confirmez votre compte';
    $mail->Body    = 'Bienvenue sur notre application Camping! Veuillez cliquer sur le lien suivant pour confirmer votre compte : <a href="' . $confirmation_link . '">Confirmer mon compte</a>';

    // Envoyer l'e-mail
    $mail->send();
} catch (Exception $e) {
    $response_array['status'] = 'error';
    $response_array['message'] = "Le message n'a pas pu être envoyé. Erreur : {$mail->ErrorInfo}";
    echo json_encode($response_array);
    die();
    exit();
}

// Insérer le nouvel utilisateur
$stmt = $conn->prepare("INSERT INTO COMPTE_VACA_MEET (NOM, MDP, EMAIL, TOKEN_COMPTE) VALUES (?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => "Erreur de préparation arf" . $conn->error]);
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
?>
