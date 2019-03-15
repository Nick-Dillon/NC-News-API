process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');


describe.only('CRUD tests', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    describe('/requests', () => {
      it('GET returns 200, returns all the topics to the user', () => request.get('/api/topics').expect(200)
        .then((res) => {
          expect(res.body.topics).to.eql([
            {
              description: 'The man, the Mitch, the legend',
              slug: 'mitch',
            },
            {
              description: 'Not dogs',
              slug: 'cats',
            }]);
        }));
      it('POST returns 201, adds a topic to the database and sends the user the new topic', () => {
        const newTopic = { description: 'test desc', slug: 'test slug' };
        return request.post('/api/topics').send(newTopic).expect(201)
          .then((res) => {
            expect(res.body.topic).to.eql(
              { description: 'test desc', slug: 'test slug' },
            );
          });
      });
    });
    describe.only('/error handling', () => {
      it('BAD REQUEST status:400, returns error message when post request does not contain enough data', () => request.post('/api/topics').send({ description: 'no slug!' }).expect(400)
        .then((res) => {
          expect(res.body.message).to.equal('Missing information from the post request!');
        }));
      it('BAD METHOD status:405, returns error message when using a method not allowed', () => request.delete('/api/topics/cats').expect(405)
        .then((res) => {
          expect(res.body.message).to.equal('Method not allowed!');
        }));
      it('BAD REQUEST status:400, returns error message when post request has wrong data type(s)', () => request.post('/api/topics').send({ slug: 123, description: 'This should fail!' }).expect(400)
        .then((res) => {
          expect(res.body.message).to.equal('Invalid type of data given for post request - make sure to use the correct data-types!');
        }));
    });
  });
  describe('/users', () => {
    describe('/requests', () => {
      it('GET status:200, responds with all users', () => request.get('/api/users').expect(200)
        .then((res) => {
          expect(res.body.users.length).to.equal(3);
        }));
      it('POST status:201, responds with newly created user', () => {
        const newUser = { username: 'NickDillon', avatar_url: 'www.google.com', name: 'Nick Dillon' };
        return request.post('/api/users').send(newUser).expect(201)
          .then((res) => {
            expect(res.body.createdUser).to.eql(newUser);
          });
      });
      it('GET status:200, responds with specific user when defined', () => request.get('/api/users/rogersop').expect(200)
        .then((res) => {
          expect(res.body.user.name).to.equal('paul');
        }));
    });
    describe('/error handling', () => {
      it('NOT FOUND status:404, returns error when user is not found', () => request.get('/api/users/Nick-Dillon').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('User not found!');
        }));
      it('METHOD NOT ALLOWED status:405, returns error when a patch is requested', () => request.patch('/api/users/rogersop').send({ avatar_url: 'www.no.com' }).expect(405)
        .then((res) => {
          expect(res.body.message).to.equal('Method not allowed!');
        }));
    });
  });
  describe('/articles', () => {
    describe('/requests', () => {
      it('GET returns 200, returns all articles to the user', () => request.get('/api/articles').expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(12);
        }));
      it('GET returns 200, returns correct properties for each article', () => request.get('/api/articles').expect(200)
        .then((res) => {
          expect(res.body.articles[0]).include.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET returns 200, returns correct count of comments for articles, and are sorted by created_at (desc) by default', () => request.get('/api/articles').expect(200)
        .then((res) => {
          expect(+res.body.articles[0].comment_count).to.equal(13);
        }));
      it('GET returns 200, accepts username query and returns articles by that user', () => request.get('/api/articles?username=rogersop').expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(3);
        }));
      it('GET returns 200, accepts topic query and returns articles of that topic', () => request.get('/api/articles?topic=mitch').expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(11);
        }));
      it('GET returns 200, accepts sort_by query and returns articles sorted by a specific column', () => request.get('/api/articles?sort_by=title').expect(200)
        .then((res) => {
          expect(res.body.articles[0].title).to.equal('Z');
          expect(res.body.articles[11].title).to.equal('A');
        }));
      it('GET returns 200, accepts order query and returns articles ordered by the query', () => request.get('/api/articles?order=asc').expect(200)
        .then((res) => {
          expect(res.body.articles[0].title).to.equal('Moustache');
          expect(res.body.articles[11].article_id).to.equal(1);
        }));
      it('GET returns 200, accepts multiple queries', () => request.get('/api/articles?topic=mitch&order=asc&username=rogersop&sortBy=title').expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[0].title).to.equal('Seven inspirational thought leaders from Manchester UK');
          res.body.articles.forEach((article) => {
            expect(article.topic).to.equal('mitch');
            expect(article.author).to.equal('rogersop');
          });
        }));
      it('POST status:201, adds an article to the database and returns new article', () => {
        const newArticle = {
          title: 'Testing the post!', body: 'This is a boring article, move on...', topic: 'cats', username: 'rogersop',
        };
        return request.post('/api/articles').send(newArticle).expect(201)
          .then((res) => {
            expect(res.body.createdArticle.title).to.equal('Testing the post!');
          });
      });
      it('GET status:200, returns a specific artile by an id query', () => request.get('/api/articles/3').expect(200)
        .then((res) => {
          expect(res.body.article.title).to.equal('Eight pug gifs that remind me of mitch');
          expect(res.body.article.comment_count).to.equal('0');
        }));
      it('PATCH status:201, returns a specific artile with a changed vote', () => request.patch('/api/articles/5').send({ inc_votes: 1 }).expect(201)
        .then((res) => {
          expect(res.body.updatedArticle.votes).to.equal(1);
          expect(res.body.updatedArticle.title).to.equal('UNCOVERED: catspiracy to bring down democracy');
        }));
      it('PATCH status:201, returns a specific artile with a lower vote', () => request.patch('/api/articles/5').send({ inc_votes: -1 }).expect(201)
        .then((res) => {
          expect(res.body.updatedArticle.votes).to.equal(-1);
        }));
      it('DELETE status:204, deletes the article, and any associated comments, and returns status 204 only', () => request.delete('/api/articles/1').expect(204));
    });
    describe('/error handling', () => {
      it('NOT FOUND status 404, returns an error message when cannot find specific article', () => request.get('/api/articles/20').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Article not found!');
        }));
      it('NOT FOUND status 404, returns an error message when cannot find specific article to patch', () => request.patch('/api/articles/20').send({ inc_votes: 1 }).expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Article not found!');
        }));
      it('NOT FOUND status 404, returns an error message when cannot find specific article to delete', () => request.delete('/api/articles/20').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot delete nonexistent article!');
        }));
      it('NOT FOUND status 404, returns an error when cannot find specific author', () => request.get('/api/articles?author=Nick-Dillon').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot find any articles by Nick-Dillon!');
        }));
      it('NOT FOUND status 404, returns an error when cannot find specific topic', () => request.get('/api/articles?topic=Northcoders').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot find any articles about Northcoders!');
        }));
      it('NOT FOUND status 400, returns an error when trying to sort by nonexistent column', () => request.get('/api/articles?sort_by=coolness').expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot sort articles by nonexistent column!');
        }));
      it('BAD REQUEST status:400, returns error message when post request does not contain enough data', () => request.post('/api/articles').send({ title: 'bad article', topic: 'cats' }).expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Missing information from the post request!');
        }));
      it('BAD REQUEST status:400, returns error message when post request does not contain enough data', () => request.post('/api/articles').send({
        title: true, topic: 'cats', body: 123, username: 'rogersop',
      }).expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Invalid type of data given for post request - make sure to use the correct data-types!');
        }));
    });
  });
  describe('/comments', () => {
    describe('/requests', () => {
      it('GET Status:200, responds with all comments for a specific article', () => request.get('/api/articles/1/comments').expect(200)
        .then((res) => {
          expect(res.body.comments.length).to.equal(13);
        }));
      it('GET Status:200, comments are default sorted by date, in descending order', () => request.get('/api/articles/1/comments').expect(200)
        .then((res) => {
          const date1 = new Date(res.body.comments[0].created_at);
          const date2 = new Date(res.body.comments[1].created_at);
          const date3 = new Date(res.body.comments[2].created_at);
          const date4 = new Date(res.body.comments[3].created_at);
          const date5 = new Date(res.body.comments[4].created_at);
          expect(date2).to.be.below(date1);
          expect(date3).to.be.below(date2);
          expect(date4).to.be.below(date3);
          expect(date5).to.be.below(date4);
        }));
      it('GET status:200, sorts by the requested column in the specified order', () => request.get('/api/articles/1/comments?sort_by=votes&order=asc').expect(200)
        .then((res) => {
          expect(res.body.comments[0].votes).to.be.at.most(res.body.comments[1].votes);
          expect(res.body.comments[1].votes).to.be.at.most(res.body.comments[2].votes);
          expect(res.body.comments[3].votes).to.be.at.most(res.body.comments[4].votes);
          expect(res.body.comments[8].votes).to.be.at.most(res.body.comments[9].votes);
          expect(res.body.comments[11].votes).to.be.at.most(res.body.comments[12].votes);
        }));
      it('GET status:200, sorts by a different requested column with no specified order', () => request.get('/api/articles/1/comments?sort_by=author').expect(200)
        .then((res) => {
          expect(res.body.comments[4].author).to.equal('icellusedkars');
          expect(res.body.comments[0].author).to.equal('icellusedkars');
          expect(res.body.comments[12].author).to.equal('butter_bridge');
          expect(res.body.comments[11].author).to.equal('butter_bridge');
          expect(res.body.comments[6].author).to.equal('icellusedkars');
        }));
      it('POST status:201, adds a new comment and returns the posted comment', () => {
        const newComment = { username: 'rogersop', body: 'this is my comment!' };
        return request.post('/api/articles/2/comments').send(newComment).expect(201)
          .then((res) => {
            expect(res.body.createdComment.author).to.equal('rogersop');
            expect(res.body.createdComment.body).to.equal('this is my comment!');
            expect(res.body.createdComment.article_id).to.equal(2);
          });
      });
      it('PATCH status:201, increases the vote by 1', () => {
        const upvote = { inc_votes: 1 };
        return request.patch('/api/comments/1').send(upvote).expect(201)
          .then((res) => {
            expect(res.body.updatedComment.votes).to.equal(17);
          });
      });
      it('DELETE status:204, deletes the comment and returns status only', () => request.delete('/api/comments/2').expect(204));
    });
    describe('/error handling', () => {
      it('NOT FOUND status:404, returns error when comments are not found', () => request.get('/api/articles/2/comments').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Comments not found!');
        }));
      it('NOT FOUND status:404, returns error when specific comment cannot be found to be deleted', () => request.delete('/api/comments/200').expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot delete nonexistent comment!');
        }));
      it('NOT FOUND status:404, returns error when specific comment cannot be found to patch', () => request.patch('/api/comments/200').send({ inc_votes: 1 }).expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Cannot patch nonexistent comment!');
        }));
    });
  });
  describe('/api', () => {
    describe('/requests', () => {
      it('GET Status:200, responds with a stringified object that has the keys of topics, articles, users, comments and api', () => request.get('/api').expect(200)
        .then((res) => {
          expect(JSON.parse(res.text)).to.haveOwnProperty('topics');
          expect(JSON.parse(res.text)).to.haveOwnProperty('articles');
          expect(JSON.parse(res.text)).to.haveOwnProperty('users');
          expect(JSON.parse(res.text)).to.haveOwnProperty('comments');
          expect(JSON.parse(res.text)).to.haveOwnProperty('api');
        }));
      it('GET Status:200, responds with a stringified object describing available route and CRUD options', () => request.get('/api').expect(200)
        .then((res) => {
          expect(res.text).to.be.a('string');
        }));
    });
    describe('/error handling', () => {
      it('', () => {

      });
    });
  });
  describe('/universal error handling', () => {
    it('NOT FOUND status:404, returns error message if bad path is given', () => request.get('/ay_pee_eye').expect(404)
      .then((err) => {
        expect(err.message).to.equal('Path not found!');
      }));
  });
});
