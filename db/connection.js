const ENV = process.env.NODE_ENV || 'development';
const config = ENV === 'production' ? { client: 'pg', connection: process.env.DB_URL } : require('../knexfile')[ENV];

console.log(config)
module.exports = require('knex')(config);