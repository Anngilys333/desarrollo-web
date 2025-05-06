document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const response = await fetch(
      "http://localhost:8080/backend/api/auth.php?action=login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (data.token) {
        saveSession(data.token, data.expires_at);
        window.location.href = 'News.html'; // Redirigir al dashboard
    } else {
        alert(data.error || 'Login failed');
    }
});

function saveSession(token, expiresAt) {
  localStorage.setItem('session', JSON.stringify({ token, expiresAt }));
}