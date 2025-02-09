-- REGISTROS

INSERT INTO artista (nombreArtista)
VALUES 
('The Beatles'),
('Pink Floyd'),
('Led Zeppelin'),
('Queen'),
('The Rolling Stones'),
('Arctic Monkeys'),
('Coldplay'),
('Oasis'),
('Michael Jackson'),
('Electric Light Orquesta');

INSERT INTO estatus_vinilo (nombreEstatusVinilo)
VALUES 
('Disponible'),
('Vendido'),
('Reservado'),
('En Subasta'),
('Retirado');

INSERT INTO genero (nombreGenero)
VALUES 
('Rock'),
('Pop'),
('Jazz'),
('Blues'),
('Hip Hop');


INSERT INTO vinilo (titulo, descripcion, anioLanzamiento, portada, muestraMusica, unboxingVideo, precioInicial, artistaID, estatusViniloID, generoID)
VALUES 
('Abbey Road', 'Álbum icónico de The Beatles', '1969', NULL, NULL, NULL, 29.99, 1, 1, 1),
('Dark Side of the Moon', 'Clásico de Pink Floyd', '1973', NULL, NULL, NULL, 39.99, 2, 4, 1),
('Mr, Blue Sky', 'Disco de clásicos músicales"', '1971', NULL, NULL, NULL, 34.99, 10, 1, 1),
('A Night at the Opera', 'Incluye "Bohemian Rhapsody"', '1975', NULL, NULL, NULL, 24.99, 4, 3, 2),
('Sticky Fingers', 'Álbum clásico de The Rolling Stones', '1971', NULL, NULL, NULL, 29.99, 5, 1, 1);

-- Michael Jackson - Thriller
INSERT INTO vinilo (titulo, descripcion, anioLanzamiento, portada, muestraMusica, unboxingVideo, precioInicial, artistaID, estatusViniloID, generoID)
VALUES 
('Thriller', 'El álbum más vendido de Michael Jackson', '1982', NULL, NULL, NULL, 49.99, 9, 1, 2);

-- Coldplay - Music Of The Spheres Vinyl
INSERT INTO vinilo (titulo, descripcion, anioLanzamiento, portada, muestraMusica, unboxingVideo, precioInicial, artistaID, estatusViniloID, generoID)
VALUES 
('Music Of The Spheres Vinyl', 'El noveno álbum de estudio de Coldplay', '2021', NULL, NULL, NULL, 44.99, 7, 1, 2);

-- Oasis - Wonderwall
INSERT INTO vinilo (titulo, descripcion, anioLanzamiento, portada, muestraMusica, unboxingVideo, precioInicial, artistaID, estatusViniloID, generoID)
VALUES 
('Wonderwall', 'Single icónico de Oasis incluido en (What’s the Story) Morning Glory?', '1995', NULL, NULL, NULL, 39.99, 8, 1, 1);

-- Arctic Monkeys - AM
INSERT INTO vinilo (titulo, descripcion, anioLanzamiento, portada, muestraMusica, unboxingVideo, precioInicial, artistaID, estatusViniloID, generoID)
VALUES 
('AM', 'Quinto álbum de estudio de Arctic Monkeys', '2013', NULL, NULL, NULL, 34.99, 6, 1, 1);


INSERT INTO usuario (nombre, apellido, username, correo, contrasenia, coins, imagenPerfil, fechaRegistro, ultimoAcceso)
VALUES 
('John', 'Doe', 'johndoe', 'johndoe@example.com', 'password123', 100.50, NULL, '2024-01-01', '2024-01-10 12:00:00'),
('Jane', 'Smith', 'janesmith', 'janesmith@example.com', 'securepass', 200.00, NULL, '2024-01-05', '2024-01-15 14:30:00'),
('Michael', 'Johnson', 'mjohnson', 'mjohnson@example.com', 'mypassword', 150.00, NULL, '2024-01-10', '2024-01-20 16:45:00'),
('Emily', 'Davis', 'emilyd', 'emilyd@example.com', 'passw0rd', 300.00, NULL, '2024-01-15', '2024-01-25 18:20:00'),
('David', 'Martinez', 'dmartinez', 'dmartinez@example.com', '12345678', 50.00, NULL, '2024-01-20', '2024-01-30 20:00:00');

INSERT INTO evento (viniloID, nombreEvento, descripcionEvento, fechaInicio, fechaTermino)
VALUES 
(1, 'Subasta Abbey Road', 'Subasta del vinilo Abbey Road', '2024-02-01 10:00:00', '2024-02-10 18:00:00'),
(2, 'Subasta Dark Side', 'Subasta del vinilo Dark Side of the Moon', '2024-02-02 12:00:00', '2024-02-12 20:00:00'),
(3, 'Subasta Led Zeppelin IV', 'Subasta del vinilo Led Zeppelin IV', '2024-02-03 14:00:00', '2024-02-13 22:00:00'),
(4, 'Subasta Night at the Opera', 'Subasta del vinilo A Night at the Opera', '2024-02-04 16:00:00', '2024-02-14 23:00:00'),
(5, 'Subasta Sticky Fingers', 'Subasta del vinilo Sticky Fingers', '2024-02-05 18:00:00', '2024-02-15 23:59:00');

-- *******Creación de los eventos de los discos agregados****************

-- Evento para Michael Jackson - Thriller
INSERT INTO evento (viniloID, nombreEvento, descripcionEvento, fechaInicio, fechaTermino)
VALUES 
(6, 'Subasta Especial de Thriller', 'Subasta del icónico álbum Thriller', '2024-12-01 10:00:00', '2024-12-05 18:00:00');

-- Evento para Coldplay - Music Of The Spheres Vinyl
INSERT INTO evento (viniloID, nombreEvento, descripcionEvento, fechaInicio, fechaTermino)
VALUES 
(7, 'Preventa Music Of The Spheres', 'Preventa del vinilo de Coldplay', '2024-12-10 09:00:00', '2024-12-15 23:59:59');

-- Evento para Oasis - Wonderwall
INSERT INTO evento (viniloID, nombreEvento, descripcionEvento, fechaInicio, fechaTermino)
VALUES 
(8, 'Edición Especial Wonderwall', 'Venta especial del single Wonderwall', '2024-12-20 08:00:00', '2024-12-25 20:00:00');

-- Evento para Arctic Monkeys - AM
INSERT INTO evento (viniloID, nombreEvento, descripcionEvento, fechaInicio, fechaTermino)
VALUES 
(9, 'Lanzamiento Exclusivo de AM', 'Lanzamiento exclusivo del álbum AM en vinilo', '2024-12-30 10:00:00', '2025-01-05 23:59:59');
