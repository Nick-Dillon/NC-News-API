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
    .then((topics) => {
      console.log('back to the controller...');
      console.log(topics);
      return res.status(201).send({ topics });
    });
});
