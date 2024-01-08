<?php
// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Récupérer le jeton de confirmation à partir de l'URL
$confirm_token = $_GET['token'];

// Préparer la requête pour éviter les injections SQL
$stmt = $conn->prepare("SELECT * FROM COMPTE_VACA_MEET WHERE TOKEN_COMPTE = ?");
$stmt->bind_param("s", $confirm_token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    // Si le jeton de confirmation est valide, mettre à jour la colonne `COMPTE_CONFIRME` à 1
    $update_stmt = $conn->prepare("UPDATE COMPTE_VACA_MEET SET COMPTE_CONFIRME=1 WHERE TOKEN_COMPTE = ?");
    $update_stmt->bind_param("s", $confirm_token);
    if ($update_stmt->execute()) {
        echo "Votre compte a été confirmé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de la confirmation de votre compte. Veuillez réessayer.";
    }
    $update_stmt->close();
} else {
    echo "Le jeton de confirmation est invalide. Veuillez réessayer.";
}

$stmt->close();
$conn->close();
?>
