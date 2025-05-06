<?php

require_once 'database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $action = $_GET['action'] ?? '';

    if ($action === 'register') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = md5($data['password']);
        $full_name = $data['full_name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $birth_date = $data['birth_date'];

        $stmt = $pdo->prepare("INSERT INTO users (username, password, full_name, email, phone, birth_date) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$username, $password, $full_name, $email, $phone, $birth_date])) {
            echo json_encode(['message' => 'User registered successfully']);
        } else {
            echo json_encode(['error' => 'Failed to register user']);
        }
    } elseif ($action === 'login') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = md5($data['password']);

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
        $stmt->execute([$username, $password]);
        $user = $stmt->fetch();

        if ($user) {
            $token = bin2hex(random_bytes(16));
            $expires_at = time() + 3600; // 1 hour from now
            $stmt = $pdo->prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
            $stmt->execute([$user['id'], $token, date('Y-m-d H:i:s', $expires_at)]);
            echo json_encode(['token' => $token, 'expires_at' => $expires_at]);
        } else {
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }
}
?>