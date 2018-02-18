FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD mysecret
ENV MYSQL_DATABASE profiler
ENV MYSQL_USER profiler
ENV MYSQL_PASSWORD profiler

ADD ["SQL/create.sql", "/docker-entrypoint-initdb.d/1-create.sql"]
ADD ["SQL/data.sql", "/docker-entrypoint-initdb.d/2-data.sql"]
ADD ["SQL/sample_data.sql", "/docker-entrypoint-initdb.d/3-sample_data.txt"]
ADD ["SQL/cleanup.sql", "/docker-entrypoint-initdb.d/4-cleanup.txt"]
