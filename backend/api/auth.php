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

    // Decodificar JSON si el Content-Type es application/json
    $input = json_decode(file_get_contents('php://input'), true);

    if ($action === 'register') {
        // Cambiar a $input para manejar datos enviados por JSON
        $username = $input['username'] ?? null;
        $password = $input['password'] ?? null;
        $full_name = $input['fullnames'] ?? null;
        $email = $input['email'] ?? null;
        $phone = $input['phone'] ?? null;
        $birth_date = $input['birthdate'] ?? null;

        // Validar que los campos requeridos no sean null
        if (!$username || !$password || !$full_name || !$email) {
            echo json_encode(['error' => 'All required fields must be filled']);
            http_response_code(400);
            exit();
        }

        // Encriptar la contraseña
        $password = md5($password);

        try {
            $stmt = $pdo->prepare("INSERT INTO users (username, password, full_name, email, phone, birth_date) VALUES (?, ?, ?, ?, ?, ?)");
            if ($stmt->execute([$username, $password, $full_name, $email, $phone, $birth_date])) {
                echo json_encode(['success' => true, 'message' => 'User registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register user']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            http_response_code(500);
        }
    } elseif ($action === 'login') {
        $username = $input['username'] ?? null;
        $password = $input['password'] ?? null;

        if (!$username || !$password) {
            echo json_encode(['error' => 'Username and password are required']);
            http_response_code(400);
            exit();
        }

        $password = md5($password);

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