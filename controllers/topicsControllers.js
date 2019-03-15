const { getTopics, createTopic } = require('../models/topicsModels');

exports.fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
});

exports.postTopic = ((req, res, next) => {
  if (req.body.slug === undefined || req.body.description === undefined) {
    return Promise.reject({ status: 400, message: 'Missing information from the post request!' }).catch(next);
  }
  return createTopic(req.body)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
});

exports.methodNotAllowed = (req, res, next) => res.status(405).send({ message: 'Method not allowed!' }).catch(next);