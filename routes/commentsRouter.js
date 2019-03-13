const commentsRouter = require('express').Router();
const voteOnComment = require('../controllers/commentsControllers');

console.log('into router');
commentsRouter.patch('/:comment_id', voteOnComment);

// commentsRouter.delete('/:comment_id', /* links to controller function to DELETE a specific comment */);

module.exports = commentsRouter;
