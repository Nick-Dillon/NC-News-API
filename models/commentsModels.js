const connection = require('../db/connection');

const getComments = () => {
  connection.select('comment_id', 'votes', 'created_at', 'author', 'body', 'article_id').from('comments');
};

const updateComment = commentToUpdate => connection('comments').where('comment_id', commentToUpdate.id).increment('votes', commentToUpdate.votes).returning('*');

const removeComment = commentToDelete => connection('comments').where('comment_id', commentToDelete).del();

module.exports = { getComments, updateComment, removeComment };
