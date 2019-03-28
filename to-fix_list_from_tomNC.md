NIck Dillon 

<!-- ### `/api/articles` 
 - **status:405 invalid request method for end-point:** PUT, DELETE, PATCH methods all should respond with a 405. Can handle this with `articlesRouter.route('/').all(()=>{})` -->
 
<!-- ### `/api/articles/:article_id` -->
 <!-- - **GET status:200 responds with a single article object:** Missing the article body -->
 <!-- - **PATCH status:200 and an updated article when given a body including a valid "inc_votes":** should be 200: "success", not 201: "created" -->
 <!-- - **GET status:400 URL contains an invalid article_id:** Uncaught error here. It defaults to 500 atm. This error is caused when you try and get an article with the id `'abc'` (invalid format) -->
 <!-- - **DELETE responds with 400 on invalid article_id:** same as above -->
 <!-- - **status:405 invalid request method for end-point:** PUT, DELETE, PATCH methods all should respond with a 405. -->

 ### `/api/articles/:article_id/comments`
<!-- - **GET responds with an array of comment objects:** Your comment object response includes the `article_id` key which needs to be removed  -->
<!-- - **GET responds with 400 for an invalid article_id:** Like in you specific article test if you enter an invalid kind of article_id it needs to respond with a 400 rather than a 500. -->
<!-- - **PATCH status:400 if given an invalid inc_votes:** if you patch with a bad inc_votes value (e.g. `{inc_votes: 'bananana'}`) it should respond with status 400 -->
<!-- -  Your post comment controller has no catch block and therefore no way to handle errors thrown by psql. Errors such as:
    1. **responds with a 404 when given a non-existent article id** - how do I differentiate between 204 and 404?
    2. **responds with a 400 when given an invalid article id**
    3. **responds with a 400 when given an invalid body referencing a non-existent column**
    4. **responds with a 422 when given a non-existent username**
- **invalid methods respond with 405:** PUT PATCH DELETE -> 405

 ### `/api/articles/:article_id/comments/:comment_id` -->
 <!-- - **PATCH status:200 and an updated comment when given a body including a valid "inc_votes":** 200, not 201 -->
 <!-- - **PATCH status:400 if given an invalid inc_votes:** if you patch with a bad inc_votes value (e.g. `{inc_votes: 'bananana'}`) it should respond with status 400 -->
 <!-- - **PATCH status:400 if invalid comment_id is used:** Gotta catch those invalid ids (e.g. /api/comments/bananana) -->
 - **PATCH status:404 non-existent comment_id is used:** You respond with a 400 rather than 404. This is because you check for the body first before looking for the comment. A neater way of doing this would be to do it at the same time using a Promise.all(). Find the comment in the DB at the same time as trying to patch it. If it doesn't exist, throw a 404. If it does, check for 400s/200s.
<!-- - **invalid methods respond with 405:** PUT PATCH DELETE -> 405 -->

<!-- ### `/api/users`
- **invalid methods respond with 405:** PUT PATCH DELETE -> 405 -->