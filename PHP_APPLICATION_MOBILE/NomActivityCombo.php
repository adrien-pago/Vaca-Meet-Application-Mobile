<?php
require_once 'config.php';

header('Content-Type: application/json');

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => "La connexion à la base de données a échoué : " . $conn->connect_error]);
    exit();
}

// Récupération de l'idCamping via GET ou POST
$idCamping = isset($_GET['idCamping']) ? $_GET['idCamping'] : (isset($_POST['idCamping']) ? $_POST['idCamping'] : null);

if ($idCamping === null) {
    echo json_encode(['error' => "idCamping est requis"]);
    exit();
}

$query = $conn->prepare("SELECT ID_ACTIVITE, LIBELLE_ACT FROM ACTIVITE WHERE ID_CAMPING = ?");
$query->bind_param("i", $idCamping); // "i" indique que l'id est un integer
$query->execute();
$result = $query->get_result();

$activites = [];
while($row = $result->fetch_assoc()) {
    $activites[] = ["id" => $row["ID_ACTIVITE"], "nom" => $row["LIBELLE_ACT"]];
}

echo json_encode($activites);

$conn->close();
?>
