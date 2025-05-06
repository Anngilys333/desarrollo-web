<?php
require_once 'cors.php';

// Simple test endpoint
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'API is working correctly',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
