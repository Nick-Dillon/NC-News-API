const {
  getArticles, getArticleComments, createComment, createArticle, getSpecificArticle, updateArticle, removeArticle,
} = require('../models/articlesModels');
const {
  columnChecker, checkArticleKeys, checkArticleKeysDataTypes, checkCommentKeys, checkCommentKeysDataTypes, checkPatchAttempt,
} = require('../utils/refFunctions');

const fetchArticles = (req, res, next) => {
  const { sort_by = 'created_at', order = 'desc' } = req.query;
  if (!columnChecker(sort_by)) {
    res.status(400).send({ message: 'Cannot sort articles by nonexistent column!' });
  }
  const whereQueries = {};
  if (req.query.username) {
    whereQueries['articles.author'] = req.query.username;
  }
  if (req.query.topic) {
    whereQueries['articles.topic'] = req.query.topic;
  }
  getArticles(whereQueries, sort_by, order)
    .then((articles) => {
      if (req.query.author) {
        const noAuthor = articles.every(article => article.author !== req.query.author);
        if (noAuthor === true) {
          return Promise.reject({ status: 404, message: `Cannot find any articles by ${req.query.author}!` });
        }
      }
      if (req.query.topic) {
        const noTopic = articles.every(article => article.topic !== req.query.topic);
        if (noTopic === true) {
          return Promise.reject({ status: 404, message: `Cannot find any articles about ${req.query.topic}!` });
        }
      }

      res.status(200).send({ articles });
    })
    .catch(next);
};

const fetchArticleComments = (req, res, next) => {
  const { sort_by = 'created_at', order = 'desc' } = req.query;
  const article_id = req.params.article_id;
  getSpecificArticle(article_id)
  .then((result) => {
    if (result.length === 0) {
      next()
      res.status(404).send({ message: "Article not found!" })
    }
  })
  getArticleComments(article_id, sort_by, order)
    .then((comments) => {
      if (comments.length === 0) {
        res.sendStatus(204)
      }
      else res.status(200).send({ comments });
    })
    .catch(err => {
      next(err)
    });
};

const postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  // if (!checkCommentKeys(req.body)) return Promise.reject({ status: 400, message: 'Missing information from the post request!' }).catch(next);
  // if (!checkCommentKeysDataTypes(req.body)) return Promise.reject({ status: 400, message: 'Invalid type of data given for post request - make sure to use the correct data-types!' }).catch(next);
  const comment = { body: req.body.body, author: req.body.username, article_id };
  createComment(comment)
    .then(([createdComment]) => {
      res.status(201).send({ createdComment });
    })
    .catch(err => {
      next(err);
    })
};

const postArticle = (req, res, next) => {
  if (!checkArticleKeys(req.body)) res.status(400).send({ message: 'Missing information from the post request!' });
  if (!checkArticleKeysDataTypes(req.body)) {
    res.status(400).send({ message: 'Invalid type of data given for post request - make sure to use the correct data-types!' });
  }
  const newArticle = {
    title: req.body.title, body: req.body.body, topic: req.body.topic, author: req.body.username,
  };
  return createArticle(newArticle)
    .then(([createdArticle]) => {
      res.status(201).send({ createdArticle });
    })
    .catch(next);
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
  if (!checkPatchAttempt(req.body)) next({ status: 400, message: 'Invalid change - you can only change the vote, and the input must be a number!' }); // done like this becuase I can't get an error passed down otherwise - problem with migration table set-up?
  else {
    const id = req.params.article_id;
    const vote = req.body.inc_votes;
    return updateArticle(id, vote)
      .then(([updatedArticle]) => {
        if (updatedArticle === undefined) {
          return Promise.reject({ status: 404, message: 'Article not found!' });
        }
        res.status(200).send({ updatedArticle });
      })
      .catch(err => {
        next(err);
      });
  }
};


const deleteArticle = (req, res, next) => {
  const id = req.params.article_id;
  return removeArticle(id)
    .then((deleteResponse) => {
      if (deleteResponse === 0) {
        return Promise.reject({ status: 404, message: 'Cannot delete nonexistent article!' });
      } res.sendStatus(204);
    })
    .catch(next);
};


module.exports = {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle, voteOnArticle, deleteArticle,
};
