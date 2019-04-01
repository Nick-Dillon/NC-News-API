const ENV = process.env.NODE_ENV || 'development';
const config = ENV === 'production' ? { connection: process.env.DB_URL } : require('../knexfile');

console.log(config)
module.exports = require('knex')(config);