const connection = require('../db/connection');

const getUsers = () => connection.select('*').from('users');

const getSingleUser = user => connection.select('*').from('users').where('username', '=', user);

const createUser = newUser => connection('users').insert(newUser).returning('*');

module.exports = { getUsers, getSingleUser, createUser };
