const connection = require('../db/connection');

const getTopics = () => connection.select('*').from('topics');

const createTopic = newTopic => connection('topics').insert(newTopic).returning('*');

module.exports = { getTopics, createTopic };
