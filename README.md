[![Build Status](https://travis-ci.org/jscoobyced/jsc-people-profiler.svg?branch=master)](https://travis-ci.org/jscoobyced/jsc-people-profiler)

# jsc-people-profiler
Application to manage people profiles (i.e. for Human Resource, Manager...)

# Setup

## Database

This project is set to run with MySQL. You'll need to create a database and an account, then run those scripts on this database:
- `<root>/app.web/SQL/create.sql`
- `<root>/app.web/SQL/data.sql`
- and optionaly `<root>/app.web/SQL/sample_data.sql`

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


- To build the dotnet core application
```
cd ../app.web
dotnet restore
dotnet build
dotnet run
```

Then you can open your browser on http://localhost:5000 to browse the application.

Enjoy!
