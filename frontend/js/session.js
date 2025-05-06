// Guardar sesión en localStorage
function saveSession(token, expiresAt) {
    localStorage.setItem('session', JSON.stringify({ token, expiresAt }));
}

// Validar sesión
function validateSession() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
        redirectToLogin();
        return false;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    if (currentTime > session.expiresAt) {
        localStorage.removeItem('session');
        redirectToLogin();
        return false;
    }

    return true;
}

// Redirigir al login
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Llamar a validateSession en cada página protegida
validateSession();