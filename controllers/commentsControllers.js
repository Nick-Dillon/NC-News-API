const { updateComment, removeComment } = require('../models/commentsModels');

const voteOnComment = (req, res, next) => {
  const commentToUpdate = { id: req.params.comment_id, votes: req.body.inc_votes };
  return updateComment(commentToUpdate)
    .then(([updatedComment]) => {
      res.status(201).send({ updatedComment });
    });
};

const deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  return removeComment(id)
    .then((deleteResponse) => {
      if (deleteResponse === 0) {
        return Promise.reject({ status: 404, message: 'Cannot delete nonexistent comment!' });
      }
      res.sendStatus(204);
    })
    .catch(next);
};

// const deleteComment = (req, res, next) => {
// const commentId = req.params.comment_id;
// return removeComment(commentId)
// .then(() => {
// res.sendStatus(204);
// });
// };

module.exports = { voteOnComment, deleteComment };
