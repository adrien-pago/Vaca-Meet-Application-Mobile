<?php
// Se connecter à la base de données (Inclure les informations de connexion depuis le fichier de configuration)
require_once 'config.php';

// Se connecter à la base de données
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Préparer la requête pour éviter les injections SQL
$query = $conn->prepare("SELECT id_camping, nom_camping FROM CAMPING");
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $campings = [];
    while($row = $result->fetch_assoc()) {
        array_push($campings, ["id" => $row["id_camping"], "nom" => $row["nom_camping"]]);
    }
    echo json_encode($campings);
} else {
    echo json_encode([]);
}

$conn->close();

