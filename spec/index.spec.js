// use this to test refFunctions (utils/refFunctions)

const { expect } = require('chai');
const {
  createdByToAuthor, createArticleRef, belongsToToArticleId, formatDate,
} = require('../utils/refFunctions');

describe('ref function tests', () => {
  describe('createdByToAuthor', () => {
    it('returns an array of objects with author/username key-value pairs', () => {
      const example = [{ body: 'hi', created_by: 'Nick' }, { body: 'Nick is the best', created_by: 'Everyone else' }];
      const actual = createdByToAuthor(example);
      const expected = [{ body: 'hi', author: 'Nick' }, { body: 'Nick is the best', author: 'Everyone else' }];
      expect(actual).to.eql(expected);
    });
  });
  describe('createArticleRef', () => {
    it('creates a new object with title and id as key-value pairs', () => {
      const example = [{ title: 'THIS IS THE NEEEWS', article_id: 1, body: 'This is The Day Today!' }, { title: 'Coming up...', article_id: 2, body: 'Bearded cleric in oily chin insertion!' }, { title: 'Jam festival', article_id: 3, body: 'I HATE SEBASTIAN COE!' }];
      const actual = createArticleRef(example);
      const expected = { 'THIS IS THE NEEEWS': 1, 'Coming up...': 2, 'Jam festival': 3 };
      expect(actual).to.eql(expected);
    });
  });
  describe('belongsToToArticleId', () => {
    it('creates a new object adding a key-value pair of "article_id": (number) to each object in the input array and removing the "belongs_to" properties', () => {
      const exampleArr = [{
        belongs_to: 'A title', created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }, {
        belongs_to: 'some title', created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }, {
        belongs_to: 'another title', created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }];
      const exampleRef = { 'A title': 1, 'some title': 2, 'another title': 3 };
      const actual = belongsToToArticleId(exampleRef, exampleArr);
      const expected = [{
        article_id: 1, created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }, {
        article_id: 2, created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }, {
        article_id: 3, created_by: 'icellusedkars', votes: 16, created_at: 1101386163389,
      }];
      expect(actual).to.eql(expected);
    });
  });
  describe('formatDate', () => {
    it('formats the epoch date value of an objects "created at" property from milliseconds to a readable date-format', () => {
      const example = [{ votes: 10, created_at: 1101386163389 }, { votes: 1, created_at: 1101386864723 }];
      const actual = formatDate(example);
      const expected = [{ votes: 10, created_at: '2004-11-25T12:36:03.389Z' }, { votes: 1, created_at: '2004-11-25T12:47:44.723Z' }];
      expect(actual).to.eql(expected);
    });
  });
});
