const usersRouter = require('express').Router();
const {
  fetchUsers, fetchSingleUser, postUser
} = require('../controllers/usersControllers');

usersRouter.route('/')
  .get(fetchUsers)
  .post(postUser)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed!' })
  }
  )
  
usersRouter.route('/:username')
  .get(fetchSingleUser)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed!' })
    })

module.exports = usersRouter;
