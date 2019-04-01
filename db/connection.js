const ENV = process.env.NODE_ENV || 'development';
const config = ENV === 'production' ? { client: 'pg', connection: process.env.DB_URL } : require('../knexfile');

console.log(config, 'config in connection.js')
module.exports = require('knex')(config);