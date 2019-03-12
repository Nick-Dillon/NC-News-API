const connection = require('../db/connection');

const getTopics = () => connection.select('*').from('topics');

const createTopic = (newTopic) => {
  return connection('topics').insert(newTopic).returning('*');
};

module.exports = { getTopics, createTopic };
