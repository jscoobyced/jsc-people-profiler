FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD mysecret
ENV MYSQL_DATABASE profiler
ENV MYSQL_USER profiler
ENV MYSQL_PASSWORD profiler

ADD ["app.web/SQL/create.sql", "/docker-entrypoint-initdb.d/1-create.sql"]
ADD ["app.web/SQL/data.sql", "/docker-entrypoint-initdb.d/2-data.sql"]
