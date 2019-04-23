# NC Knews API by Nick Dillon

This API is designed to act as the backend to the NC-Knews 'News Sprint' project. It holds all the database-manipulation functionality for the project, including informing the user of any errors in their use of the project.




## Getting Started

To download this to a local machine, enter the following into your terminal, the file location you want the API stored:

```
git clone https://github.com/Nick-Dillon/BE2-NC-Knews.git
```

## Prerequisites

To use this API, you will need to install the following dependencies:
```
    "body-parser": "^1.18.3"        -           npm install body-parser
    "express": "^4.16.4"            -           npm install express
    "knex": "^0.15.2"               -           npm install knex
    "pg": "^7.8.2"                  -           npm install pg
```

NOTE - These are the versions that the API has been built upon. If you are using more recent versions of any of these, make sure to test the functionality of the API before deployment.


## Installing and Setup

The following scripts have been created in the package.json file:

```
    "setup-dbs": "psql -f db/dbs-setup.sql",
    "migrate-make": "knex migrate:make",
    "migrate-latest": "knex migrate:latest",
    "migrate-rollback": "knex migrate:rollback",
    "seed": "knex seed:run",
```
To set up the development environment, run the following scripts in your terminal:

* **npm run setup-dbs** - This creates the databases for our information to be stored. If any previous versions exist, it will delete them first then recreate them.
* **npm run seed** - This will run the seed file, populating the databases with the data in the 'db' folder

## Creating Tables/Schemas with Migrate Scripts

The other scripts are used for the creation and use of migration files. If you wish to set up new tables/schema in your database, this is what they are for.

To create a new schema, run **npm run migrate-make** followed by the name of the file you want to create. E.g.:
```
npm run migrate-make create_my_first_table
```
This will create a time-stamped file in the /db/migrations folder, where your chosen file name appears after a timestamp.

If you look in the newly created migration folder, you will notice that two empty functions have been created: **Up and Down**. These are used by **knex** to create the tables/schema in the databases, or remove them, when called upon, using the **migrate-latest** and **migrate-rollback** scripts. An example completed migration file may look like this:

```
(Result of running 'npm run migrate-make create_users_table')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (users_table) => {
    topics_table.string('slug').primary();
    topics_table.string('description').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};

```

* Running **npm run migrate-latest** goes through all the migration files and runs every 'exports.up' function it finds.
* Running **npm run migrate-rollback** goes through all the migration files and runds every 'exports.down' function it finds.

## Configuring the Project

As the project has been built with test/development data, you will need to create a 'knexfile.js' file to make sure the project uses the right seed-data.

Create the following file (currently listed in the .gitignore file) and save:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const dbConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: '${your username for PSQL}', **NOT NEEDED FOR iOS USERS
      password: '${your password for PSQL}', **NOT NEEDED FOR iOS USERS
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: '${your username for PSQL}', **NOT NEEDED FOR iOS USERS
      password: '${your password for PSQL}', **NOT NEEDED FOR iOS USERS
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
```

## Testing

The project has been built using the TDD approach. You can find all the test files in the 'spec' folder, and run them using **npm test**. The tests will use test-data to check that different types of requests that are made return the expected results, and that utility-functions return the required value.

## Deployment

The original version has been deployed to Heroku - you may wish to use them, or find a separate hosting company. You can view the endpoints of the deployed version at https://ncnews-api.herokuapp.com/api.

## Authors

* **Nick Dillon** - as part of the Northcoders (Manchester) Bootcamp!

### Acknowledgments

* **Northcoders** - for providing the test data and all their help throughout the course!