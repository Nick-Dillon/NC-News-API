const articlesRouter = require('express').Router();
const { fetchArticles, fetchArticleComments, postComment } = require('../controllers/articlesControllers');

articlesRouter.get('/', fetchArticles);
// articlesRouter.get('/:article_id', /* links to controller function for GET specific article */);

articlesRouter.get('/:article_id/comments', fetchArticleComments);

// articlesRouter.post('/', /* links to controller function for POST */);
articlesRouter.post('/:article_id/comments', postComment);

// articlesRouter.patch('/:article_id', /* links to controller function for PATCH specific article */);

// articlesRouter.delete('/:article_id', /* links to controller function for DELETE specific article */);


module.exports = articlesRouter;
