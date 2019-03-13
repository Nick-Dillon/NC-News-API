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

const countComments = (articleArr, commentArr) => 'hello';
// needs article array
// needs to count how many comments have same article id as the article
// find the length of an array of comments, then push a new property ('comment_count') to each article object. The value will be the amount of comments that match the article id.

module.exports = {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate, countComments,
};
