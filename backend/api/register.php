<?php
header('Content-Type: application/json');
require_once '../database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Obtener los datos enviados desde el formulario
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $full_name = $_POST['fullnames'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $birth_date = $_POST['birthdate'] ?? '';

    // Validar que los campos requeridos no estén vacíos
    if (empty($username) || empty($password) || empty($full_name) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos requeridos deben ser completados.']);
        exit;
    }

    // Validar que el usuario o el correo no existan ya en la base de datos
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'El usuario o el correo ya están registrados.']);
        exit;
    }

    // Insertar el nuevo usuario en la base de datos
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password, full_name, email, phone, birth_date) VALUES (?, ?, ?, ?, ?, ?)");
    $result = $stmt->execute([$username, $hashedPassword, $full_name, $email, $phone, $birth_date]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Usuario registrado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>