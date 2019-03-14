GET /api/topics       - DONE
POST /api/topics      - DONE, may need further testing
                            - Not enough data given 400 error DONE

GET /api/articles     - DONE
    Query tests - DONE
        400: Cannot sort by nonexistent column
        404: Cannot find any articles by author
        404: Cannot find any articles about topic
        400: Cannot sort columns by non-existent column
POST /api/articles    - DONE

GET /api/articles/:article_id   - DONE - Article not found 404 error DONE
PATCH /api/articles/:article_id - DONE - Article not found 404 error DONE
DELETE /api/articles/:article_id    - DONE - Article not found 404 error DONE

GET /api/articles/:article_id/comments - DONE - Comments not found 404 error DONE
POST /api/articles/:article_id/comments - DONE

PATCH /api/comments/:comment_id - DONE - Comment not found 404 error DONE
DELETE /api/comments/:comment_id - DONE - Comment not found 404 error DONE

GET /api/users          - DONE
POST /api/users         - DONE

GET /api/users/:username - DONE - User not found 404 error DONE

GET /api                - DONE