const connection = require('../db/connection');

const getTopics = () => connection.select('*').from('topics');

const createTopic = (newTopic) => {
  console.log('into the model...');
  console.log(newTopic);
  // return connection.insert(newTopic).into('topics').returning('*');
  return connection('topics').insert(newTopic).returning('*');
};

module.exports = { getTopics, createTopic };
