<?php
// Démarrer une session (si nécessaire, sinon vous pouvez commenter cette ligne)
// session_start();

// Inclure la configuration de la base de données
require_once 'config.php';

// Créer une connexion à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    // La connexion a échoué
    echo json_encode(['status' => 'error', 'message' => 'La connexion à la base de données a échoué : ' . $conn->connect_error]);
    exit();
} else {
    // La connexion a réussi
    echo json_encode(['status' => 'success', 'message' => 'Connexion à la base de données réussie.']);
}

// Fermer la connexion
$conn->close();
?>
