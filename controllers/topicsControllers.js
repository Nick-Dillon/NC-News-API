const { getTopics, createTopic } = require('../models/topicsModels');

exports.fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
});

exports.postTopic = ((req, res, next) => {
  return createTopic(req.body)
    .then(([topic]) => {
      return res.status(201).send({ topic });
    });
});
