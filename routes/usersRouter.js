const usersRouter = require('express').Router();
const {
  fetchUsers, fetchSingleUser, postUser, methodNotAllowed,
} = require('../controllers/usersControllers');

usersRouter.get('/', fetchUsers);
usersRouter.get('/:username', fetchSingleUser);

usersRouter.post('/', postUser);

usersRouter.all('/*', methodNotAllowed);


module.exports = usersRouter;
