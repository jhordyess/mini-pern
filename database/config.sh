#!/bin/bash

# PostgreSQL Database Initialization Script
#------------------------------------------
# This script creates a new database and user for the application.

# Check if environment variables are set
if [[ -z "${DB_USER}" || -z "${DB_PASSWORD}" || -z "${DB_NAME}" ]]; then
	echo "Error: One or more required environment variables are not set."
	exit 1
fi

# Create role
psql -v ON_ERROR_STOP=1 <<SQL
CREATE ROLE "${DB_USER}" WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD '${DB_PASSWORD}';
SQL

# Create database
psql -v ON_ERROR_STOP=1 <<SQL
CREATE DATABASE "${DB_NAME}"
  WITH 
  OWNER = "${DB_USER}"
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1;
SQL

# Grant permissions
psql -v ON_ERROR_STOP=1 -d ${DB_NAME} <<SQL
GRANT ALL ON ALL TABLES IN SCHEMA public TO "${DB_USER}";
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO "${DB_USER}";
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO "${DB_USER}";
SQL
