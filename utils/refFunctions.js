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

const formatDate = (arr) => {
  const newArr = [];
  arr.forEach((obj) => {
    newArr.push({ ...obj, created_at: new Date(+obj.created_at) });
    return obj;
  });
  return newArr;
};

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

const checkArticleKeysDataTypes = (body) => {
  if (typeof body.title === 'string' && typeof body.body === 'string' && typeof body.topic === 'string' && typeof body.username === 'string' && body.title.length > 0 && body.body.length > 0) {
    return true;
  }
  return false;
};

const checkCommentKeys = (body) => {
  if (body.hasOwnProperty('username') && body.hasOwnProperty('body')  > 0 && body.username.length > 0 && body.body.length > 0) return true;
  return false;
};

const checkCommentKeysDataTypes = (body) => {
  if (typeof body.username === 'string' && typeof body.body === 'string' && body.body.length) {
    return true};
  return false;
};

const checkUserKeys = (body) => {
  if (body.hasOwnProperty('username') && body.hasOwnProperty('name')) return true;
  return false;
};

const checkUserKeysDataTypes = (body) => {
  if (body.hasOwnProperty('avatar_url')) {
    if (typeof body.avatar_url !== 'string' || body.username.length <= 0 || body.name.length <= 0) return false;
  }
  if (typeof body.username === 'string' && typeof body.name === 'string') return true;
  return false;
};

const checkPatchAttempt = (body) => {
  if (body.hasOwnProperty('inc_votes')) {
    if (Object.keys(body).length > 1) return false;
    if (typeof body.inc_votes !== 'number') return false;
    return true;
  }
};

module.exports = {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate, columnChecker, checkArticleKeys, checkArticleKeysDataTypes, checkCommentKeys, checkCommentKeysDataTypes, checkUserKeys, checkUserKeysDataTypes, checkPatchAttempt
};
