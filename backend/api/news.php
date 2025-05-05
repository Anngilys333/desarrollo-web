<?php
header('Content-Type: application/json');
require_once 'database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM news ORDER BY published_at DESC");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($news);
}
?>