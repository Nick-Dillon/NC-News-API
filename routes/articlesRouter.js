const articlesRouter = require('express').Router();
const {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle, voteOnArticle, deleteArticle,
} = require('../controllers/articlesControllers');


articlesRouter.route('/')
  .get(fetchArticles)
  .post(postArticle)
  .all((err, req, res, next) => { next(err); });

articlesRouter.route('/:article_id')
  .get(fetchSpecificArticle)
  .patch(voteOnArticle)
  .delete(deleteArticle)
  .all((err, req, res, next) => { next(err); });

articlesRouter.route('/:article_id/comments')
  .get(fetchArticleComments)
  .post(postComment)
  .all((err, req, res, next) => { next(err); });


// ### `/api/articles`
//  - **status:405 invalid request method for end-point:** PUT, DELETE, PATCH methods all should respond with a 405. Can handle this with `articlesRouter.route('/').all(()=>{})`

module.exports = articlesRouter;
