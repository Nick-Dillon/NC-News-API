const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const usersRouter = require('./usersRouter');
const articlesRouter = require('./articlesRouter');
const displayApiRoutes = require('../controllers/apiControllers');
const commentsRouter = require('./commentsRouter');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

apiRouter.route('/')
    .get(displayApiRoutes)
    .all((req, res, next) => {
        res.status(405).send({ message: 'Method not allowed!' })
    })

module.exports = apiRouter;



