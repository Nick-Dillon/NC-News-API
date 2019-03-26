const { getUsers, getSingleUser, createUser } = require('../models/usersModels');
const { checkUserKeys, checkUserKeysDataTypes } = require('../utils/refFunctions');

exports.fetchUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    });
};

exports.fetchSingleUser = (req, res, next) => {
  getSingleUser(req.params.username)
    .then(([user]) => {
      if (user === undefined) {
        return Promise.reject({ status: 404, message: 'User not found!' });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  if (!checkUserKeys(req.body)) next({ status: 400, message: 'Missing information from the post request!' });
  if (!checkUserKeysDataTypes(req.body)) next({ status: 400, message: 'Invalid type of data given for post request - make sure to use the correct data-types!' });
  createUser(req.body)
    .then(([createdUser]) => res.status(201).send({ createdUser })).catch(next);
};
