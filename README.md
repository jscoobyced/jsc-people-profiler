[![Build Status](https://travis-ci.org/jscoobyced/jsc-people-profiler.svg?branch=master)](https://travis-ci.org/jscoobyced/jsc-people-profiler)

# jsc-people-profiler
Application to manage people profiles (i.e. for Human Resource, Manager...)

# Setup

## Database

### With docker

The easiest way to get started with a valid database is to use docker. If you don't have a running docker instance, check out there to set it up.

If you have docker up and running, fire up your favorite terminal then run one of the following commands.

```
docker-compose -p profiler build
docker run --name profilerdb -p 13306:3306 -d profiler_database
```
If the above command returns an error that it can't create a TCP connection looking similar like this (mostly on Windows 10):
```
Error response from daemon: driver failed programming external connectivity on endpoint profilerdb (a585677b537fedc749a2ae4f003010661bf704b4f962607863373a1d9182c5f0): Error starting userland proxy: mkdir /port/tcp:127.0.0.1:13306:tcp:172.17.0.2:3306: input/output error.
 ```
then stop your running containers, stop docker then restart it. If you're still getting an error, also try disable the "Experimental features".

If you want to insert the sample data:  
`docker exec profilerdb mysql -u profiler -pprofiler profiler -e "source /docker-entrypoint-initdb.d/3-sample_data.txt"`

To stop the container:  
`docker stop profilerdb`

To start it the next times:  
`docker start profilerdb`

### With native MySQL database

You'll need to create a database and an account. You can do so by connecting as root then entering the following commands:
- `CREATE DATABASE profiler;`
- `GRANT ALL PRIVILEGES ON profiler.* TO 'profiler_user'@'localhost' IDENTIFIED BY 'profiler_password';`

Obviously you'll want to use your own username and password.

Then run those scripts on your database:
- `SQL/create.sql`
- `SQL/data.sql`
- and optionaly `SQL/sample_data.sql`

You can do so by typing:  
`mysql -u profiler_user -p profiler < create.sql`  
In the above command, the `-p profiler` are 2 separate arguments. The `-p` means you'll be prompted with a password, the `profiler` argument is the database name created above.

You can always delete all tables by running the script:
- `SQL/cleanup.sql`

Then update the `<root>/app.web/appsettings.json` to set your MySQL server host, username and password in the `ConnectionString/MySql` setting.

## Application

In a CMD or TERMINAL window, follow those steps:
- To create the client-side assets:
```
cd node
yarn install
```
followed by

| production mode | development mode |
|  -------------- | ---------------- |
| `yarn run wp:prod` | `yarn run wp:dev` |

** Note: if you run in production mode, you'll need to edit the file  
`app.web/Views/Shared/_Layout.cshtml`  
and delete the extra  
`<script src='jsc-xxxxxxxxxx.css'>`  
which is inserted at the bottom of the file due to a [bug](https://github.com/jantimon/html-webpack-plugin/issues/798) in HtmlWebpackPlugin

- To build the dotnet core application
```
cd ../app.web
dotnet restore
dotnet build
dotnet run
```

Then you can open your browser on http://localhost:5000 to browse the application.

Enjoy!
