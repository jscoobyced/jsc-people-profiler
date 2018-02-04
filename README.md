[![Build Status](https://travis-ci.org/jscoobyced/jsc-people-profiler.svg?branch=master)](https://travis-ci.org/jscoobyced/jsc-people-profiler)

# jsc-people-profiler
Application to manage people profiles (i.e. for Human Resource, Manager...)

# Setup

## Database

### With docker

The easiest way to get started with a valid database is to use docker. If you don't have a running docker instance, check out there to set it up.

If you have docker up and running, fire up your favorite terminal then run one of the following commands.

#### Development

During development, the best is to use the version with sample data pre-loaded:  
`docker-compose -f docker-compose-dev.yml -p profiler up --rm`

#### Production

If you feel like running the DB in production with docker, then simply:  
`docker-compose -p profiler up`

### With native MySQL database

This project is set to run with MySQL. You'll need to create a database and an account. You can do so by connecting as root then entering the followinf commands:
- `CREATE DATABASE profiler;`
- `GRANT ALL PRIVILEGES ON profiler.* TO 'profiler_user'@'localhost' IDENTIFIED BY 'profiler_password';`

Obviously you'll want to use your own username and password.

Then run those scripts on your database:
- `<root>/app.web/SQL/create.sql`
- `<root>/app.web/SQL/data.sql`
- and optionaly `<root>/app.web/SQL/sample_data.sql`

You can do so by typing:  
`mysql -u profiler_user -p profiler < create.sql`  
In the above command, the `-p profiler` are 2 separate arguments. The `-p` means you'll be prompted with a password, the `profiler` argument is the database name created above.

You can always delete all tables by running the script:
- `<root>/app.web/SQL/cleanup.sql`

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
