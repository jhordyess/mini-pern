#!/bin/sh

# INFO: This script is designed for running the application and migrating the database in a production environment. It requires the following:
# - Having the DATABASE_URL environment variable.
# - Having the schema and migrations located in the prisma folder.
# - Having the Prisma CLI (the migration script will install it if it is not installed).

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: \$DATABASE_URL is not defined!"
  exit 1
else
  echo "Migration process initiated..."
  yarn prisma migrate deploy
  echo "Migration completed successfully."

  echo "Starting the server..."
  yarn start
fi
