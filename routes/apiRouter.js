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
apiRouter.get('/', displayApiRoutes);

module.exports = apiRouter;


// ### `/api/articles`
//  - **status:405 invalid request method for end-point:** PUT, DELETE, PATCH methods all should respond with a 405. Can handle this with `articlesRouter.route('/').all(()=>{})`
