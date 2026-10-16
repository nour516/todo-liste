<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'todolist');
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');

$conn = new mysqli(
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT
);

if ($conn->connect_error) {
    echo json_encode(["error" => "Erreur de connexion : " . $conn->connect_error]);
    exit();
}


if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action === 'new' && isset($_GET['title'])) {
        $title = $conn->real_escape_string($_GET['title']);
        $sql = "INSERT INTO todo (title, done) VALUES ('$title', 0)";
        $conn->query($sql);
    }

    if ($action === 'delete' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $sql = "DELETE FROM todo WHERE id = $id";
        $conn->query($sql);
    }

    if ($action === 'toggle' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $sql = "UPDATE todo SET done = 1 - done WHERE id = $id";
        $conn->query($sql);
    }
}

$taches = [];


$sql = 'SELECT * FROM todo ORDER BY created_at DESC';
$r = $conn->query($sql);

if ($r) {
    while ($row = $r->fetch_assoc()) {
        $taches[] = $row;
    }
}


echo json_encode($taches);
?>
