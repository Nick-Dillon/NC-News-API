// use this to test all CRUD requests

process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');


describe('CRUD tests', () => {
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
          console.log(res.body.topic);
          expect(res.body.topic).to.eql(
            { description: 'test desc', slug: 'test slug' },
          );
        });
    });
    // TEST TO SEE IF DATABASE NOW CONTAINS THE POSTED TOPIC??
  });
  describe('/users', () => {
    it('', () => {

    });
  });
  xdescribe('/articles', () => {
    it('GET returns 200, returns all articles to the user', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(res.body.articles.length).to.equal(12);
        console.log(res.body.articles[0]);
      }));
    it('GET returns 200, returns correct properties for each article', () => request.get('/api/articles').expect(200)
      .then((res) => {
        res.body.articles.forEach(article => console.log(article.title, article.comment_count));
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
});


// Should accept queries
// author, which filters the articles by the username value specified in the query
// topic, which filters the articles by the topic value specified in the query
// sort_by, which sorts the articles by any valid column (defaults to date)
// order, which can be set to asc or desc for ascending or descending (defaults to descending)
