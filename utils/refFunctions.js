const createdByToAuthor = (arr) => {
  const endResult = arr.map((comment) => {
    const newObj = { ...comment, author: comment.created_by };
    delete newObj.created_by;
    return newObj;
  });
  return endResult;
};

const createArticleRef = articleInfo => articleInfo.reduce((acc, article) => {
  acc[article.title] = article.article_id;
  return acc;
}, {});

const belongsToToArticleId = (articleRef, commentArr) => {
  const endResult = commentArr.map((comment) => {
    const newObj = { ...comment, article_id: articleRef[comment.belongs_to] };
    delete newObj.belongs_to;
    return newObj;
  });
  return endResult;
};

const formatDate = arr => arr.map((obj) => {
  obj.created_at = new Date(+obj.created_at);
  return obj;
});

const columnChecker = (str) => {
  if (str === 'author' || str === 'title' || str === 'article_id' || str === 'topic' || str === 'created_at' || str === 'votes' || str === 'comment_count') {
    return true;
  }
  return false;
};

const checkArticleKeys = (body) => {
  if (body.hasOwnProperty('title') && body.hasOwnProperty('body') && body.hasOwnProperty('topic') && body.hasOwnProperty('username')) return true;
  return false;
};

const checkKeysDataTypes = (body) => {
  if (typeof body.title === 'string' && typeof body.body === 'string' && typeof body.topic === 'string' && typeof body.username === 'string') {
    return true;
  }
  return false;
};

module.exports = {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate, columnChecker, checkArticleKeys, checkKeysDataTypes,
};
