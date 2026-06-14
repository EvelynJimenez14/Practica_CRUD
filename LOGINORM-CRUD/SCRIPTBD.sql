DROP DATABASE IF EXISTS usuarios;
CREATE DATABASE usuarios;
use usuarios;
CREATE TABLE login (
 idLOGIN INT NOT NULL AUTO_INCREMENT,
 USERNAME VARCHAR(45) NOT NULL UNIQUE,
 PASSWORD VARCHAR(45) NOT NULL ,
 TIPOUSUARIO VARCHAR(45) NOT NULL,
 PRIMARY KEY (idLOGIN) );
INSERT INTO login (USERNAME, PASSWORD, TIPOUSUARIO) VALUES ('admin', '1234','administrador');

-- Base de datos principal del proyecto
DROP DATABASE IF EXISTS PrediccionDemanda;
CREATE DATABASE PrediccionDemanda;
USE PrediccionDemanda;

-- Tabla de productos
CREATE TABLE productos (
    idProducto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idProducto)
);

-- Tabla de ventas
CREATE TABLE ventas (
    idVenta INT NOT NULL AUTO_INCREMENT,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    cliente VARCHAR(100),
    PRIMARY KEY (idVenta),
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);

-- Tabla de predicciones
CREATE TABLE predicciones (
    idPrediccion INT NOT NULL AUTO_INCREMENT,
    idProducto INT NOT NULL,
    fecha DATE NOT NULL,
    demanda_predicha INT,
    modelo VARCHAR(50),
    PRIMARY KEY (idPrediccion),
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);

-- Datos iniciales de prueba
INSERT INTO productos (nombre, descripcion, precio, cantidad, categoria)
VALUES 
('Laptop X', 'Laptop de 15 pulgadas con 8GB RAM', 15000.00, 20, 'Electrónica'),
('Smartphone Y', 'Teléfono Android gama media con 128GB', 8000.00, 50, 'Electrónica'),
('Televisor Z', 'Pantalla LED 50 pulgadas Full HD', 12000.00, 15, 'Electrodomésticos');

