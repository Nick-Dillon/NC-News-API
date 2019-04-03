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
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
