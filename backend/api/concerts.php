<?php
header('Content-Type: application/json');
require_once 'database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT title, description, image_url, ticket_url, date, location FROM concerts ORDER BY date ASC");
    $concerts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($concerts);
}
?>