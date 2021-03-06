
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (comment_table) => {
    comment_table.increments('comment_id').primary();
    comment_table.string('author');
    comment_table.foreign('author').references('username').on('users');
    comment_table.integer('article_id').references('article_id').inTable('articles').onDelete('cascade');
    comment_table.integer('votes').defaultTo(0);
    comment_table.datetime('created_at').defaultTo(knex.fn.now());
    comment_table.string('body', 10485759).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
