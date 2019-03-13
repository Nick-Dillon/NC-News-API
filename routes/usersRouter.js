const usersRouter = require('express').Router();
const { fetchUsers, postUser } = require('../controllers/usersControllers');

usersRouter.get('/', fetchUsers);
// usersRouter.get('/:username', /* links to controller function for GET specific user */);

usersRouter.post('/', postUser);


module.exports = usersRouter;
