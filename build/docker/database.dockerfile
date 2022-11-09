FROM postgres
COPY ./config-db.sh /docker-entrypoint-initdb.d/config-db.sh