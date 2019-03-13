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
        expect(res.body.user.name).to.equal('paul')
      })
    );
  });
  describe('/articles', () => {
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
  });
  describe('/comments', () => {
    it('', () => {

    });
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
