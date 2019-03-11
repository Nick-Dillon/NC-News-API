
exports.up = function(knex, Promise) {
  console.log('creating topic table');
  return knex.schema.createTable('topics', topics_table => {
      topics_table.string('slug').primary();
      topics_table.string('description').notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log('deleting topic table');
  return knex.schema.dropTable('topics')
};
