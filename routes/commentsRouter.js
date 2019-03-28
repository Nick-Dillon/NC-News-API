const commentsRouter = require('express').Router();
const { voteOnComment, deleteComment } = require('../controllers/commentsControllers');

commentsRouter.route('/:comment_id')
    .patch(voteOnComment)
    .delete(deleteComment)
    .all((req, res, next) => {
        res.status(405).send({ message: 'Method not allowed!' })
    })

module.exports = commentsRouter;
