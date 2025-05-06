<?php
header('Content-Type: application/json');
require_once 'database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT image_url, description FROM carousel_images ORDER BY id ASC");
    $carouselImages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($carouselImages);
}
?>