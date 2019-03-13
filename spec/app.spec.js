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
    // TEST TO SEE IF DATABASE NOW CONTAINS THE POSTED TOPIC??
  });
  describe('/users', () => {
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
  describe.only('/articles', () => {
    it('GET returns 200, returns all articles to the user', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(res.body.articles.length).to.equal(12);
      }));
    it('GET returns 200, returns correct properties for each article', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(res.body.articles[0]).include.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('GET returns 200, returns correct count of comments for articles', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(+res.body.articles[1].comment_count).to.equal(13);
      }));
    it('GET returns 200, accepts username query and returns articles by that user', () => request.get('/api/articles?username=rogersop').expect(200)
      .then((res) => {
        expect(res.body.articles.length).to.equal(3);
      }));
    it.only('POST status:201, adds an article to the database and returns new article', () => {
      const newArticle = {
        title: 'Testing the post!', body: 'This is a boring article, move on...', topic: 'cats', username: 'rogersop',
      };
      return request.post('/api/articles').send(newArticle).expect(201)
        .then((res) => {
          expect(res.body.createdArticle.title).to.equal('Testing the post!');
        });
    });
    // Request body accepts
    // an object containing the following properties:
    // title
    // body
    // topic
    // username
    // Responds with
    // the posted article
  });
  describe('/comments', () => {
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
  describe('/api', () => {
    it('GET Status:200, responds with a stringified object describing available route and CRUD options', () => request.get('/api').expect(200)
      .then((res) => {
        expect(res.text).to.be.a('string');
      }));
    it('GET Status:200, responds with a stringified object that has the keys of topics, articles, users, comments and api', () => request.get('/api').expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).to.haveOwnProperty('topics');
        expect(JSON.parse(res.text)).to.haveOwnProperty('articles');
        expect(JSON.parse(res.text)).to.haveOwnProperty('users');
        expect(JSON.parse(res.text)).to.haveOwnProperty('comments');
        expect(JSON.parse(res.text)).to.haveOwnProperty('api');
      }));
  });
});
