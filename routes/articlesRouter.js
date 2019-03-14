const articlesRouter = require('express').Router();
const {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle, voteOnArticle, deleteArticle,
} = require('../controllers/articlesControllers');

articlesRouter.get('/', fetchArticles);
articlesRouter.get('/:article_id', fetchSpecificArticle);

articlesRouter.get('/:article_id/comments', fetchArticleComments);

articlesRouter.post('/', postArticle);
articlesRouter.post('/:article_id/comments', postComment);

articlesRouter.patch('/:article_id', voteOnArticle);

articlesRouter.delete('/:article_id', deleteArticle);


module.exports = articlesRouter;
