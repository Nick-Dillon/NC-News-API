const { getTopics, createTopic } = require('../models/topicsModels');

exports.fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
});

exports.postTopic = ((req, res, next) => {
  console.log('into the controller...');
  console.log(`the req body is ${req.body}`);
  return createTopic(req.body)
    .then(([topic]) => {
      console.log('back to the controller...');
      // topic = topic[0];
      console.log({ topic });
      return res.status(201).send({ topic });
    });
});
