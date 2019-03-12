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
  obj.created_at = new Date(+obj.created_at).toISOString();
  return obj;
});


module.exports = {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate,
};
