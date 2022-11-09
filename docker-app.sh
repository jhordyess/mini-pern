#!/bin/bash
mkdir -v build/docker/frontend build/docker/backend
rsync -av --exclude-from='build/docker/.buildignore' ./frontend/ ./build/docker/frontend/
rsync -av --exclude-from='build/docker/.buildignore' ./backend/ ./build/docker/backend/
# DB
db_script_path=config-db.sh
cp -v ./database/config.sh ./build/docker/${db_script_path}
echo 'psql -v ON_ERROR_STOP=1 -U ${DB_USER} -d ${DB_NAME}  << EOSQL' >>./build/docker/${db_script_path}
cat ./database/physical_model.sql >>./build/docker/${db_script_path}
echo 'EOSQL' >>./build/docker/${db_script_path}
#
docker compose -p mini-pern -f ./build/docker/docker-compose.yml up -d
rm -rv build/docker/frontend build/docker/backend build/docker/${db_script_path}
