TOPICS DONE
/---------------
GET /api/topics       - DONE
POST /api/topics      - DONE - Not enough data given 400 error DONE
                             - Incorrect data type given 400 error DONE
                             - Duplicate topic post attempted 422 error DONE

        Other tests -
        405: Cannot use specific method
/---------------


GET /api/articles     - DONE
    Query tests - DONE
        400: Cannot sort by nonexistent column
        404: Cannot find any articles by author
        404: Cannot find any articles about topic
POST /api/articles    - DONE - Missing info from request 400 error DONE
                               Incorrect data type given 400 error DONE

GET /api/articles/:article_id   - DONE - Article not found 404 error DONE
PATCH /api/articles/:article_id - DONE - Article not found 404 error DONE
                                       - Invalid patch request (trying to patch more than the vote) 400 error DONE
                                       - Invalid patch request (vote is not given a number) 400 error DONE
DELETE /api/articles/:article_id    - DONE - Article not found 404 error DONE

GET /api/articles/:article_id/comments - DONE - Comments not found 404 error DONE
        Query tests - DONE
                400: Cannot sort by nonexistent column
POST /api/articles/:article_id/comments - DONE - Missing info from request 400 error DONE
                                                 Incorrect data type given 400 error DONE

PATCH /api/comments/:comment_id - DONE - Comment not found 404 error DONE
                                        - Invalid patch request (trying to patch more than the vote) 400 error DONE
                                        - Invalid patch request (vote is not given a number) 400 error DONE
DELETE /api/comments/:comment_id - DONE - Comment not found 404 error DONE

USERS DONE
/-----------------------
GET /api/users          - DONE
POST /api/users         - DONE - Duplicate user post attempted 422 error DONE
                               - Not enough data given 400 error DONE
                               - Incorrect data type given 400 error DONE
        Other tests - 
        405: Cannot use specific method

GET /api/users/:username - DONE - User not found 404 error DONE
/-----------------------

GET /api                - DONE - Invalid path 404 error DONE



