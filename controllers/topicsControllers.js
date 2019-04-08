const { getTopics, createTopic } = require('../models/topicsModels');
const {whitespaceChecker} = require('../utils/refFunctions')

exports.fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
});

exports.postTopic = ((req, res, next) => {
  if (req.body.slug === undefined || req.body.description === undefined || req.body.slug.length <= 0 || req.body.description.length <= 0) next({ status: 400, message: 'Missing information from the post request!' });
  if (typeof req.body.slug !== 'string' || typeof req.body.description !== 'string') next({ status: 400, message: 'Invalid type of data given for post request - make sure to use the correct data-types!' });
  if (whitespaceChecker(req.body.slug) && whitespaceChecker(req.body.description)) next({status: 422, message: "You can't just have spaces for your topic... write something!"})
  else {
    return createTopic(req.body)
      .then(([topic]) => {
        res.status(201).send({ topic });
      })
      .catch(err => {
        next(err)
      });
  }
});

exports.methodNotAllowed = (req, res, next) => res.status(405).send({ message: 'Method not allowed!' }).catch(next);
