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
---------------
Some of these tests fail because of design choices rather than bad functionality/error handling. You don't need to follow our spec to a tee, but you *must* make sure your responses are consistent. This includes all response objects; every path that responds with a comment must be an object keyed with "comment" rather than "updatedComment" or "newComment" etc.
---------------
mocha ./spec/nc.spec.js


  /
    ✓ GET status:404 for any non-existent route
    /api
      /topics
        ✓ GET status:200 responds with an array of topics objects
        ✓ POST status:201 responds with the added topic
        ✓ POST status:422 client sends a body with a duplicate slug
        ✓ POST status:400 if request body is malformed (missing description property)
        ✓ status:405 invalid HTTP method for this resource
      /articles
        ✓ status:405 invalid request method for end-point
        (CORE TESTS) --> GET status:200
          ✓ responds with an array of articles with correct keys
          ✓ takes a topic query bringing articles for a given topic
          ✓ responds with an 404 for articles queried with non-existent topic
          ✓ sorts articles (DEFAULT sort_by=created_at) (DEFAULT order=desc)
          ✓ takes sort_by query which alters the column by which data is sorted (DEFAULT order=desc)
          ✓ takes a order query which changes the sort to ascending (DEFAULT sort_by=created_at)
          ✓ can take a sort_by and an order query
          1) will ignore an invalid sort_by query
          ✓ article objects have a comment_count property
      /articles/:article_id
        ✓ GET status:200 responds with a single article object
        2) PATCH status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP)
        3) PATCH status:200 responds with an updated article when given a body including a valid "inc_votes" (VOTE DOWN)
        4) PATCH status:200s no body responds with an unmodified article
        ✓ DELETE status:204 and removes the article when given a valid article_id
        ✓ DELETE responds with a 204 when deleting an article without comments (no comments required to perform delete)
        ✓ invalid methods respond with 405
        ERRORS
          ✓ GET status:404 url contains a non-existent (but potentially valid) article_id
          ✓ GET status:400 URL contains an invalid article_id
          ✓ PATCH status:400 if given an invalid inc_votes
          ✓ DELETE status:404 when given a non-existent article_id
          ✓ DELETE responds with 400 on invalid article_id
      /api/articles/:article_id/comments
        ✓ invalid methods respond with 405
        GET
          (CORE TESTS) --> status:200
            ✓ responds with an array of comment objects
            ✓ sorts in the data (DEFAULT order=desc) and (DEFAULT sort_by=created_at)
            ✓ can be sorted by author (DEFAULT order=desc)
            ✓ can be sorted by votes (DEFAULT order=desc)
            ✓ can change the sort order (DEFAULT sort_by=created_at)
          ERRORS
            ✓ responds with 404 for a non-existent article_id
            ✓ responds with 400 for an invalid article_id
        POST
          ✓ responds with a 201 and the posted comment when given a valid article_id
          ✓ responds with a 404 when given a non-existent article id
          ✓ responds with a 400 when given an invalid article id
          5) responds with a 400 when given an invalid body referencing a non-existent column
          ✓ POST responds with a 422 when given a non-existent username
      comments/:comment_id
        6) PATCH status:200 and an updated comment when given a body including a valid "inc_votes" (VOTE DOWN)
        7) PATCH status:200 with no body responds with an unmodified comment
        ✓ PATCH status:400 if given an invalid inc_votes
        8) PATCH status:404 non-existent comment_id is used
        ✓ PATCH status:400 if invalid comment_id is used
        ✓ DELETE status:204 deletes the comment and responds with No Content
        ✓ DELETE status:404 client uses non-existent comment_id
        ✓ invalid methods respond with 405
    /users
      ✓ GET responds with a 200 and an array of user objects
      9) invalid methods respond with 405
    /users/:username
      ✓ GET status:200 responds with a user object when given a valid username
      ✓ GET status:404 when a non-existent username
      ✓ invalid methods respond with 405


  45 passing (5s)
  9 failing

  1) /
       /api
         /articles
           (CORE TESTS) --> GET status:200
             will ignore an invalid sort_by query:
     Error: expected 200 "OK", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  2) /
       /api
         /articles/:article_id
           PATCH status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP):
     Error: expected 201 "Created", got 200 "OK"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  3) /
       /api
         /articles/:article_id
           PATCH status:200 responds with an updated article when given a body including a valid "inc_votes" (VOTE DOWN):
     Error: expected 201 "Created", got 200 "OK"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  4) /
       /api
         /articles/:article_id
           PATCH status:200s no body responds with an unmodified article:
     Error: expected 201 "Created", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  5) /
       /api
         /api/articles/:article_id/comments
           POST
             responds with a 400 when given an invalid body referencing a non-existent column:
     Error: expected 400 "Bad Request", got 201 "Created"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  6) /
       /api
         comments/:comment_id
           PATCH status:200 and an updated comment when given a body including a valid "inc_votes" (VOTE DOWN):
     Error: expected 201 "Created", got 200 "OK"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  7) /
       /api
         comments/:comment_id
           PATCH status:200 with no body responds with an unmodified comment:
     Error: expected 200 "OK", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  8) /
       /api
         comments/:comment_id
           PATCH status:404 non-existent comment_id is used:
     Error: expected 404 "Not Found", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  9) /
       /users
         invalid methods respond with 405:
     Error: expected 405 "Method Not Allowed", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)





  /
    ✓ GET status:404 for any non-existent route
    /api
      /topics
        ✓ GET status:200 responds with an array of topics objects
        ✓ POST status:201 responds with the added topic
        ✓ POST status:422 client sends a body with a duplicate slug
        ✓ POST status:400 if request body is malformed (missing description property)
        ✓ status:405 invalid HTTP method for this resource
      /articles
        ✓ status:405 invalid request method for end-point
        (CORE TESTS) --> GET status:200
          ✓ responds with an array of articles with correct keys
          ✓ takes a topic query bringing articles for a given topic
          1) responds with an empty array for articles queried with non-existent topic
          ✓ sorts articles (DEFAULT sort_by=created_at) (DEFAULT order=desc)
          ✓ takes sort_by query which alters the column by which data is sorted (DEFAULT order=desc)
          ✓ takes a order query which changes the sort to ascending (DEFAULT sort_by=created_at)
          ✓ can take a sort_by and an order query
          2) will ignore an invalid sort_by query
          ✓ article objects have a comment_count property
      /articles/:article_id
        ✓ GET status:200 responds with a single article object
        3) PATCH status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP)
        4) PATCH status:200 responds with an updated article when given a body including a valid "inc_votes" (VOTE DOWN)
        5) PATCH status:200s no body responds with an unmodified article
        ✓ DELETE status:204 and removes the article when given a valid article_id
        ✓ DELETE responds with a 204 when deleting an article without comments (no comments required to perform delete)
        ✓ invalid methods respond with 405
        ERRORS
          ✓ GET status:404 url contains a non-existent (but potentially valid) article_id
          ✓ GET status:400 URL contains an invalid article_id
          ✓ PATCH status:400 if given an invalid inc_votes
          ✓ DELETE status:404 when given a non-existent article_id
          ✓ DELETE responds with 400 on invalid article_id
      /api/articles/:article_id/comments
        ✓ invalid methods respond with 405
        GET
          (CORE TESTS) --> status:200
            ✓ responds with an array of comment objects
            ✓ sorts in the data (DEFAULT order=desc) and (DEFAULT sort_by=created_at)
            ✓ can be sorted by author (DEFAULT order=desc)
            ✓ can be sorted by votes (DEFAULT order=desc)
            ✓ can change the sort order (DEFAULT sort_by=created_at)
          ERRORS
            ✓ responds with 404 for a non-existent article_id
            ✓ responds with 400 for an invalid article_id
        POST
          6) responds with a 201 and the posted comment when given a valid article_id
          ✓ responds with a 404 when given a non-existent article id
          ✓ responds with a 400 when given an invalid article id
          7) responds with a 400 when given an invalid body referencing a non-existent column
          ✓ POST responds with a 422 when given a non-existent username
      comments/:comment_id
        8) PATCH status:200 and an updated comment when given a body including a valid "inc_votes" (VOTE DOWN)
        9) PATCH status:200 with no body responds with an unmodified comment
        ✓ PATCH status:400 if given an invalid inc_votes
        10) PATCH status:404 non-existent comment_id is used
        ✓ PATCH status:400 if invalid comment_id is used
        ✓ DELETE status:204 deletes the comment and responds with No Content
        ✓ DELETE status:404 client uses non-existent comment_id
        ✓ invalid methods respond with 405
    /users
      ✓ GET responds with a 200 and an array of user objects
      11) invalid methods respond with 405
    /users/:username
      ✓ GET status:200 responds with a user object when given a valid username
      ✓ GET status:404 when a non-existent username
      ✓ invalid methods respond with 405


  43 passing (8s)
  11 failing

  1) /
       /api
         /articles
           (CORE TESTS) --> GET status:200
             responds with an empty array for articles queried with non-existent topic:
     Error: expected 200 "OK", got 404 "Not Found"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  2) /
       /api
         /articles
           (CORE TESTS) --> GET status:200
             will ignore an invalid sort_by query:
     Error: expected 200 "OK", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  3) /
       /api
         /articles/:article_id
           PATCH status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP):
     TypeError: Cannot read property 'votes' of undefined
      at request.patch.send.expect.then (spec/nc.spec.js:189:31)
      at process.internalTickCallback (internal/process/next_tick.js:77:7)

  4) /
       /api
         /articles/:article_id
           PATCH status:200 responds with an updated article when given a body including a valid "inc_votes" (VOTE DOWN):
     TypeError: Cannot read property 'votes' of undefined
      at request.patch.send.expect.then (spec/nc.spec.js:196:31)
      at process.internalTickCallback (internal/process/next_tick.js:77:7)

  5) /
       /api
         /articles/:article_id
           PATCH status:200s no body responds with an unmodified article:
     Error: expected 200 "OK", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  6) /
       /api
         /api/articles/:article_id/comments
           POST
             responds with a 201 and the posted comment when given a valid article_id:
     TypeError: Cannot read property 'body' of undefined
      at request.post.send.expect.then (spec/nc.spec.js:310:33)
      at process.internalTickCallback (internal/process/next_tick.js:77:7)

  7) /
       /api
         /api/articles/:article_id/comments
           POST
             responds with a 400 when given an invalid body referencing a non-existent column:
     Error: expected 400 "Bad Request", got 201 "Created"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  8) /
       /api
         comments/:comment_id
           PATCH status:200 and an updated comment when given a body including a valid "inc_votes" (VOTE DOWN):
     TypeError: Cannot read property 'votes' of undefined
      at request.patch.send.expect.then (spec/nc.spec.js:345:31)
      at process.internalTickCallback (internal/process/next_tick.js:77:7)

  9) /
       /api
         comments/:comment_id
           PATCH status:200 with no body responds with an unmodified comment:
     Error: expected 200 "OK", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  10) /
       /api
         comments/:comment_id
           PATCH status:404 non-existent comment_id is used:
     Error: expected 404 "Not Found", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

  11) /
       /users
         invalid methods respond with 405:
     Error: expected 405 "Method Not Allowed", got 400 "Bad Request"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1599:8)
      at process.internalTickCallback (internal/process/next_tick.js:72:19)

