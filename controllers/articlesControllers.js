const {
  getArticles, getArticleComments, createComment, createArticle, getSpecificArticle, updateArticle, removeArticle,
} = require('../models/articlesModels');


const fetchArticles = (req, res, next) => {
  const { sort_by = 'created_at', order = 'desc' } = req.query;
  const whereQueries = {};
  if (req.query.username) {
    whereQueries['articles.author'] = req.query.username;
  }
  if (req.query.topic) {
    whereQueries['articles.topic'] = req.query.topic;
  }
  getArticles(whereQueries, sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchArticleComments = (req, res, next) => {
  const article_id = req.params.article_id;
  let sortBy = 'created_at';
  let orderBy = 'desc';
  if (req.query.sort_by) {
    sortBy = req.query.sort_by;
  }
  if (req.query.order === 'asc') {
    orderBy = 'asc';
  }
  getArticleComments(article_id, sortBy, orderBy)
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, message: 'Comments not found!' });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const comment = { body: req.body.body, author: req.body.username, article_id };
  createComment(comment)
    .then(([createdComment]) => {
      res.status(201).send({ createdComment });
    });
};

const postArticle = (req, res, next) => {
  const newArticle = {
    title: req.body.title, body: req.body.body, topic: req.body.topic, author: req.body.username,
  };
  return createArticle(newArticle)
    .then(([createdArticle]) => {
      res.status(201).send({ createdArticle });
    });
};

const fetchSpecificArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  return getSpecificArticle(articleId)
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, message: 'Article not found!' });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

const voteOnArticle = (req, res, next) => {
  const id = req.params.article_id;
  const vote = req.body.inc_votes;
  return updateArticle(id, vote)
    .then(([updatedArticle]) => {
      res.status(201).send({ updatedArticle });
    });
};

const deleteArticle = (req, res, next) => {
  const id = req.params.article_id;
  return removeArticle(id)
    .then(() => res.sendStatus(204));
};

module.exports = {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle, voteOnArticle, deleteArticle,
};
