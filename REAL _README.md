# NC Knews API by Nick Dillon

This API is designed to act as the backend to the NC-Knews 'News Sprint' project. It holds all the database-manipulation functionality for the project, including informing the user of any errors in their use of the project.




## Getting Started

To download this to a local machine, enter the following into your terminal, the file location you want the API stored:

```
git clone https://github.com/Nick-Dillon/BE2-NC-Knews.git
```

### Prerequisites

To use this API, you will need to install the following dependencies:
```
    "body-parser": "^1.18.3"        -           npm install body-parser
    "express": "^4.16.4"            -           npm install express
    "knex": "^0.15.2"               -           npm install knex
    "pg": "^7.8.2"                  -           npm install pg
```

NOTE - These are the versions that the API has been built upon. If you are using more recent versions of any of these, make sure to test the functionality of the API before deployment.


### Installing and Setup

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

### Creating Tables/Schemas with Migrate Scripts

The other scripts are used for the creation and use of migration files. If you wish to set up new tables/schema in your database, this is what they are for.

To create a new schema, run **npm run migrate-make** followed by the name of the file you want to create. E.g.:
```
npm run migrate-make create_my_first_table
```
This will create a time-stamped file in the /db/migrations folder, where your chosen file name appears after a timestamp.

If you look in the newly created migration folder, you will notice that two empty functions have been created: **Up and Down**. These are used by **knex** to create the tables/schema in the databases, or remove them, when called upon, using the **migrate-latest** and **migrate-rollback** scripts. An example completed migration file may look like this:

```
(Result of running 'npm run migrate-make create_')

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

-----------------------------
-----------------------------
-----------------------------


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc