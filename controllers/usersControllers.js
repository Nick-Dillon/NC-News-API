const { getUsers, getSingleUser, createUser } = require('../models/usersModels');

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
  createUser(req.body)
    .then(([createdUser]) => res.status(201).send({ createdUser }));
};
