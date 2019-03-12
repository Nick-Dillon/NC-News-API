const topicsRouter = require('express').Router();
const { fetchTopics } = require('../controllers/topicsControllers');

topicsRouter.get('/', fetchTopics);

// topicsRouter.post('/', /* links to controller function for POST */);

module.exports = topicsRouter;
