USE bogota_vibes;

-- Usuarios
INSERT INTO users (username, password, full_name, email, phone, birth_date)
VALUES
('admin', MD5('admin123'), 'Admin User', 'admin@example.com', '1234567890', '1990-01-01'),
('johndoe', MD5('password123'), 'John Doe', 'john@example.com', '9876543210', '1995-05-15');

-- Eventos
INSERT INTO events (title, description, image_url, date, location)
VALUES
('Concierto de Rock', 'Un espectacular concierto de rock en vivo.', 'Imagenes/Ej1.jpg', '2025-06-15', 'Bogotá'),
('Festival Gastronómico', 'Disfruta de los mejores sabores locales e internacionales.', 'Imagenes/Ej1.jpg', '2025-07-20', 'Bogotá');

-- Noticias
INSERT INTO news (title, content, image_url)
VALUES
('Nuevo Festival en Bogotá', 'Se anuncia un nuevo festival cultural en la ciudad.', 'Imagenes/ConciertoINDEX.png'),
('Concierto de Rock', 'El concierto de rock más esperado del año llega a Bogotá.', 'Imagenes/Ej1.jpg');

-- Comentarios
INSERT INTO comments (news_id, user_id, content)
VALUES
(1, 1, '¡Qué emocionante! No puedo esperar para asistir.'),
(2, 2, 'Este concierto será increíble.');