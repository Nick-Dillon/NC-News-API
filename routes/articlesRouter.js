const articlesRouter = require('express').Router();
const {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle, voteOnArticle, deleteArticle,
} = require('../controllers/articlesControllers');


articlesRouter.route('/')
  .get(fetchArticles)
  .post(postArticle)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed!' })
    })

articlesRouter.route('/:article_id')
  .get(fetchSpecificArticle)
  .patch(voteOnArticle)
  .delete(deleteArticle)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed!' })
    });

articlesRouter.route('/:article_id/comments')
  .get(fetchArticleComments)
  .post(postComment)
  .all((err, req, res, next) => { next(err) });


module.exports = articlesRouter;
