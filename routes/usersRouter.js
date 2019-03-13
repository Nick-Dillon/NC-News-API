const usersRouter = require('express').Router();
const { fetchUsers, fetchSingleUser, postUser } = require('../controllers/usersControllers');

usersRouter.get('/', fetchUsers);
usersRouter.get('/:username', fetchSingleUser);

usersRouter.post('/', postUser);


module.exports = usersRouter;
