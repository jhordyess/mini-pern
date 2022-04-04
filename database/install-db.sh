#!/bin/bash
#? https://hub.docker.com/_/postgres
# Crear rol
psql -v ON_ERROR_STOP=1 -U postgres << EOSQL
CREATE ROLE "admin-user" WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD '7jWflTrT6tcKzVz9k0Ir';
EOSQL
# Crear base de datos
psql -v ON_ERROR_STOP=1 -U postgres << EOSQL
CREATE DATABASE "crud-db"
  WITH 
  OWNER = "admin-user"
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1;
EOSQL
# Crear tablas y otros
#? ./modelo_fisico.sql
psql -v ON_ERROR_STOP=1 -U admin-user -d crud-db << EOSQL
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
EOSQL
# Asignando permisos
psql -v ON_ERROR_STOP=1 -U postgres -d crud-db << EOSQL
GRANT ALL ON ALL TABLES IN SCHEMA public TO "admin-user";
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO "admin-user";
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO "admin-user";
EOSQL
