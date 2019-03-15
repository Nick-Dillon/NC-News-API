const { getUsers, getSingleUser, createUser } = require('../models/usersModels');
const { checkUserKeys } = require('../utils/refFunctions');

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
  createUser(req.body)
    .then(([createdUser]) => res.status(201).send({ createdUser })).catch(next);
};

exports.methodNotAllowed = (req, res, next) => res.status(405).send({ message: 'Method not allowed!' }).catch(next);
