const connection = require('../db/connection');

const getArticles = (reqQuery, sortBy, order) => connection.select('articles.author', 'articles.title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
  .from('articles')
  .where(reqQuery)
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .count('comments.article_id as comment_count')
  .groupBy('articles.article_id', 'comments.article_id')
  .orderBy(sortBy, order);

const getArticleComments = (articleId, sortBy, order) => connection.select('*').from('comments')
  .where('comments.article_id', articleId)
  .orderBy(sortBy, order);

const createComment = comment => connection('comments').insert(comment).returning('*');

const createArticle = article => connection('articles').insert(article).returning('*');

const getSpecificArticle = id => connection.select('articles.author', 'articles.title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes', 'articles.body')
  .from('articles')
  .where('articles.article_id', id)
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .count('comments.article_id as comment_count')
  .groupBy('articles.article_id', 'comments.article_id');

const updateArticle = (id, vote) => connection('articles').where('article_id', id).increment('votes', vote).returning('*');

const removeArticle = id => connection('articles').where('article_id', id).del();

module.exports = {
  getArticles, getArticleComments, createComment, createArticle, getSpecificArticle, updateArticle, removeArticle,
};
