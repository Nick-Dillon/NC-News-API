const {topicData, userData, articleData, commentData } = require('../data');

exports.seed = (knex, Promise) => {
    return knex.migrate
        .rollback()
        .then(()=> knex.migrate.latest())
        .then(() =>
            knex('topics').insert(topicData).returning('*'),
        )
        .then(() => 
            knex('users').insert(userData).returning('*')
        )
        .then(() => 
            knex('articles').insert(articleData).returning('*')
        )
        .then((articleInfo) => 
            knex('comments').insert(commentData).returning('*')
        )
}