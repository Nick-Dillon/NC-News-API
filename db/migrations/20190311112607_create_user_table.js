
exports.up = function (knex, Promise) {
  console.log('creating user table');
  return knex.schema.createTable('users', (users_table) => {
    users_table.string('username').notNullable().primary();
    users_table.string('avatar_url');
    users_table.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  console.log('deleting user table');
  return knex.schema.dropTable('users');
};
