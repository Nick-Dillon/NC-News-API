const topicsRouter = require('express').Router();
const { fetchTopics, postTopic, methodNotAllowed } = require('../controllers/topicsControllers');

topicsRouter.get('/', fetchTopics);

topicsRouter.post('/', postTopic);

topicsRouter.all('/*', methodNotAllowed);


module.exports = topicsRouter;
