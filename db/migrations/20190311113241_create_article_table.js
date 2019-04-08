
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (article_table) => {
    article_table.increments('article_id').primary();
    article_table.string('title', 10485759).notNullable();
    article_table.string('body', 10485759).notNullable();
    article_table.integer('votes').defaultTo(0);
    article_table.string('topic').notNullable();
    article_table.foreign('topic').references('slug').inTable('topics');
    article_table.string('author');
    article_table.foreign('author').references('username').on('users');
    article_table.datetime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
