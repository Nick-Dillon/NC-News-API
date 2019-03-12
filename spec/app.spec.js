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
    it('POST returns 201, adds a topic to the database and sends the user the new topic', () => {
      const newTopic = { description: 'test desc', slug: 'test slug' };
      return request.post('/api/topics').send(newTopic).expect(201)
        .then((res) => {
          expect(res.body.topics).to.eql([
            { description: 'test desc', slug: 'test slug' },
          ]);
        });
    });
    //TEST TO SEE IF DATABASE NOW CONTAINS THE POSTED TOPIC??
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
