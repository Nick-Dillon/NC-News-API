const { updateComment, removeComment } = require('../models/commentsModels');
const { checkPatchAttempt } = require('../utils/refFunctions');

const voteOnComment = (req, res, next) => {
  // if (!checkPatchAttempt(req.body)) next({ status: 400, message: 'Invalid change - you can only change the vote, and the input must be a number!' });
  // if (!checkPatchAttempt(req.body)) next(err);
  // else {
    const commentToUpdate = { id: req.params.comment_id, votes: req.body.inc_votes };
    return updateComment(commentToUpdate)
      .then(([updatedComment]) => {
        if (updatedComment === undefined) {
          return Promise.reject({ status: 404, message: 'Cannot patch nonexistent comment!' });
        }
        res.status(200).send({ updatedComment });
      })
      .catch(err => {
        console.log(err)
        next(err)
      });
  // }
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

module.exports = { voteOnComment, deleteComment };
