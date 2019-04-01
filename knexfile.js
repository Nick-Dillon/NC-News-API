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
      username: 'nicholas',
      password: 'rated',
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: 'nicholas',
      password: 'rated',
    },
  },
  production: {
    ssl: true,
    client: 'pg',
    connection: `${DB_URL}?ssl=true`,
    migrations: {
      directory: './seed/migrations/',
    },
    seeds: {
      directory: './seed',
    },
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
