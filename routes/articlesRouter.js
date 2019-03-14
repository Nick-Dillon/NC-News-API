const articlesRouter = require('express').Router();
const {
  fetchArticles, fetchArticleComments, postComment, postArticle, fetchSpecificArticle,
} = require('../controllers/articlesControllers');

articlesRouter.get('/', fetchArticles);
articlesRouter.get('/:article_id', fetchSpecificArticle);

articlesRouter.get('/:article_id/comments', fetchArticleComments);

articlesRouter.post('/', postArticle);
articlesRouter.post('/:article_id/comments', postComment);

// articlesRouter.patch('/:article_id', /* links to controller function for PATCH specific article */);

// articlesRouter.delete('/:article_id', /* links to controller function for DELETE specific article */);


module.exports = articlesRouter;
