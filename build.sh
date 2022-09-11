#!/bin/bash
mkdir -v build/frontend build/backend
rsync -av --exclude-from='build/.buildignore' ./frontend/ ./build/frontend/
rsync -av --exclude-from='build/.buildignore' ./backend/ ./build/backend/
# DB
db_script_path=config-db.sh
cp -v ./database/config.sh ./build/${db_script_path}
echo 'psql -v ON_ERROR_STOP=1 -U ${DB_USER} -d ${DB_NAME}  << EOSQL' >>./build/${db_script_path}
cat ./database/physical_model.sql >>./build/${db_script_path}
echo 'EOSQL' >>./build/${db_script_path}
#
docker compose -p mini-pern -f ./build/docker-compose.yml up -d
rm -rv build/frontend build/backend build/${db_script_path}
