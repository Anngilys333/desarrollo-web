USE bogota_vibes;

-- Usuarios
INSERT INTO users (username, password, full_name, email, phone, birth_date)
VALUES
('admin', MD5('admin123'), 'Admin User', 'admin@example.com', '1234567890', '1990-01-01'),
('johndoe', MD5('password123'), 'John Doe', 'john@example.com', '9876543210', '1995-05-15');

-- Eventos
INSERT INTO events (title, description, image_url, puntaje, date, location)
VALUES
('Gran Festival de Música', 'Gran festival de música en vivo con artistas internacionales.', 'Imagenes/Ej3.jpg', 5, '2025-06-15', 'Bogotá'),
('Concierto de Rock', 'Espectacular concierto de rock con luces y sonido envolvente.', 'Imagenes/Ej2.jpg', 4, '2025-07-20', 'Bogotá'),
('Evento Cultural', 'Danza, teatro y exposiciones que te sumergen en la historia y el arte.', 'Imagenes/Ej1.jpg', 3, '2025-08-10', 'Bogotá'),
('Festival Gastronómico', 'Sabores exóticos y locales para deleitar tu paladar.', 'Imagenes/Ej4.jpg', 4, '2025-09-05', 'Bogotá');

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


-- Poblar la tabla de conciertos
INSERT INTO concerts (title, description, image_url, ticket_url, date, location) VALUES
('Reik', 'Concierto de Reik en Bogotá', 'Imagenes/Reik.png', 'https://tuboleta.com/es/reik', '2025-06-15', 'Movistar Arena'),
('Hozier', 'Hozier Unreal Unearth Tour 2025', 'Imagenes/HOZIER.jpg', 'https://tuboleta.com/es/eventos/hozier-unreal-unearth-tour-2025', '2025-07-20', 'Parque Simón Bolívar'),
('Juliana', 'Juliana Bienvenidos a la Pista', 'Imagenes/Juliana.png', 'https://tuboleta.com/es/eventos/juliana-bienvenidos-la-pista', '2025-08-10', 'Teatro Colón');

-- Poblar la tabla de imágenes del carrusel
INSERT INTO carousel_images (image_url, description) VALUES
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 1'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 2'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 3'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 4'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 5'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 6'),
('./Imagenes/Ej1.jpg', 'Descripción de Imagen 7');