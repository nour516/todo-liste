<?php

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
    die("Erreur de connexion : " . $conn->connect_error);
}

if (isset($_GET['action']) && $_GET['action'] === 'new') {
    $title = $_GET['title'];
    $sql = "INSERT INTO todo (title) VALUES ('$title')";
    $conn->query($sql);
}

if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $id = $_GET['id'];
    $sql = "DELETE FROM todo WHERE id = $id";
    $conn->query($sql);
}

if (isset($_GET['action']) && $_GET['action'] === 'toggle') {
    $id = $_GET['id'];
    $sql = "UPDATE todo SET done = 1 - done WHERE id = $id";
    $conn->query($sql);
}

$taches = [];

$sql = 'SELECT * FROM todo ORDER BY created_at DESC';
$r = $conn->query($sql);

while ($row = $r->fetch_assoc()) {
    $taches[] = $row;
}



?>
