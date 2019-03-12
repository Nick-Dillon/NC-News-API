const { getTopics } = require('../models/topicsModels');

exports.fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      console.log(topics);
      console.log(res);
      res.status(200).send({ topics });
    });
});
