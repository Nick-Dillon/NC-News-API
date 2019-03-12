const connection = require('../db/connection');

const getTopics = () => connection.select('*').from('topics');


module.exports = { getTopics };
