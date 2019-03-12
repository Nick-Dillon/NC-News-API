// use this to test all CRUD requests

process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');


describe('CRUD tests', () => {
  beforeEach(() => { connection.seed.run(); });
  after(() => { connection.destroy(); });

  describe.only('/topics', () => {
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
    xit('POST returns 201, adds a topic to the database and sends the user the db with new topic included', () => {
      const newTopic = { description: 'test', slug: 'cats' };
      return request.post('/api/topics', newTopic).expect(201)
        . then((res) => {
          expect(res.body.topics).to.eql(
            {
              description: 'The man, the Mitch, the legend',
              slug: 'mitch',
            },
            {
              description: 'Not dogs',
              slug: 'cats',
            },
          );
        });
    });
  });
  describe('/users', () => {
    it('', () => {

    });
  });
  describe('/articles', () => {
    it('', () => {

    });
  });
  describe('/comments', () => {
    it('', () => {

    });
  });
});
