const {
  topicData, userData, articleData, commentData,
} = require('../data');
const {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate,
} = require('../../utils/refFunctions');

exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex('topics').insert(topicData).returning('*'))
  .then(() => knex('users').insert(userData).returning('*'))
  .then(() => {
    const newArticleData = formatDate(articleData);
    return knex('articles').insert(newArticleData).returning('*');
  })
  .then((articleTable) => {
    const articleRef = createArticleRef(articleTable);
    let newCommentData = formatDate(commentData);
    newCommentData = createdByToAuthor(newCommentData);
    return knex('comments').insert(belongsToToArticleId(articleRef, newCommentData)).returning('*');
  });
