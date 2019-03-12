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
  describe.only('/articles', () => {
    it('GET returns 200, returns all articles to the user', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(res.body.articles.length).to.equal(12);
        expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
      }));
    it('GET returns 200, returns correct properties for each article', () => request.get('/api/articles').expect(200)
      .then((res) => {
        expect(res.body.articles[0]).include.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');

        /*
        author which is the username from the users table
title
article_id
topic
created_at
votes
comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
        */
      }));
  });
  describe('/comments', () => {
    it('', () => {

    });
  });
});
