/* Drop Tables */

DROP TABLE IF EXISTS Articulo CASCADE
;

DROP TABLE IF EXISTS Categoria CASCADE
;

DROP TABLE IF EXISTS Marca CASCADE
;

/* Create Tables */

CREATE TABLE Articulo
(
	id serial PRIMARY KEY,
	Codigo varchar(50) NOT NULL UNIQUE,
	Detalles varchar(50) NOT NULL,
	Nombre varchar(50) NOT NULL,
	Precio integer NOT NULL,
	Stock integer NOT NULL,
	Fecha_de_creacion date DEFAULT CURRENT_DATE,
	Baja boolean DEFAULT false, 
	id_Categoria integer NOT NULL,
	id_Marca integer NOT NULL
)
;

CREATE TABLE Categoria
(
	id serial PRIMARY KEY,
	Nombre varchar(50) NOT NULL UNIQUE
)
;

CREATE TABLE Marca
(
	id serial PRIMARY KEY,
	Nombre varchar(50) NOT NULL UNIQUE
)
;

/* Create Foreign Key Constraints */

ALTER TABLE Articulo ADD CONSTRAINT FK_Articulo_Categoria
	FOREIGN KEY (id_Categoria) REFERENCES Categoria (id) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE Articulo ADD CONSTRAINT FK_Articulo_Marca
	FOREIGN KEY (id_Marca) REFERENCES Marca (id) ON DELETE No Action ON UPDATE No Action
;