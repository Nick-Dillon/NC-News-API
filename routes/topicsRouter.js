const topicsRouter = require('express').Router();
const { fetchTopics, postTopic } = require('../controllers/topicsControllers');

topicsRouter.get('/', fetchTopics);

topicsRouter.post('/', postTopic);

module.exports = topicsRouter;
