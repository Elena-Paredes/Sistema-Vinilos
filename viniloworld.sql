CREATE DATABASE vinilo;
DROP DATABASE vinilo;
USE vinilo;

-- 1. Tabla ARTISTA
CREATE TABLE artista (
    artistaID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreArtista VARCHAR(65) NOT NULL
);

-- 2. Tabla ESTATUS_VINILO
CREATE TABLE estatus_vinilo (
    estatusViniloID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreEstatusVinilo VARCHAR(65) NOT NULL
);

-- 3. Tabla GENERO
CREATE TABLE genero (
    generoID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreGenero VARCHAR(65) NOT NULL
);

-- 4. Tabla VINILO
CREATE TABLE vinilo (
    viniloID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    anioLanzamiento VARCHAR(4) NOT NULL,
    portada LONGBLOB NULL,
    muestraMusica LONGBLOB NULL,
    unboxingVideo LONGBLOB NULL,
    precioInicial NUMERIC(10, 2) NOT NULL,
    artistaID INTEGER NULL,
    estatusViniloID INTEGER NULL,
    generoID INTEGER NULL,
    FOREIGN KEY (artistaID) REFERENCES Artista(artistaID),
    FOREIGN KEY (estatusViniloID) REFERENCES Estatus_Vinilo(estatusViniloID),
    FOREIGN KEY (generoID) REFERENCES Genero(generoID)
);

ALTER TABLE vinilo MODIFY COLUMN portada LONGBLOB;
ALTER TABLE vinilo MODIFY COLUMN muestraMusica LONGBLOB;
ALTER TABLE vinilo MODIFY COLUMN unboxingVideo LONGBLOB;
DESC vinilo;

-- 5. Tabla USUARIO
CREATE TABLE usuario (
    usuarioID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(65) NOT NULL,
    apellido VARCHAR(65) NOT NULL,
    username VARCHAR(65) NOT NULL,
    correo VARCHAR(65) NOT NULL,
    contrasenia VARCHAR(65) NOT NULL,
    coins NUMERIC(10, 2) NULL,
    imagenPerfil LONGBLOB NULL,
    fechaRegistro DATE NOT NULL,
    ultimoAcceso DATETIME NOT NULL
);

ALTER TABLE usuario MODIFY COLUMN imagenPerfil LONGBLOB;

-- 6. Tabla EVENTO 
CREATE TABLE evento (
    eventoID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    viniloID INTEGER NULL, 
    nombreEvento VARCHAR(65) NOT NULL,
    descripcionEvento VARCHAR(100) NOT NULL,
    fechaInicio DATETIME NOT NULL,
    fechaTermino DATETIME NOT NULL,
    FOREIGN KEY (viniloID) REFERENCES Vinilo(viniloID) 
);

ALTER TABLE evento 
MODIFY viniloID INTEGER NULL;
SELECT * FROM vinilo;
DESC vinilo;







