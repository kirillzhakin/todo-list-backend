const userRouter = require('express').Router();

const {
  usersController, userController, getMe,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
userRouter.get('/', usersController);

// GET /users/me - возвращает информацию о текущем пользователе
userRouter.get('/me', getMe);

// GET /users/:id - возвращает пользователя по id
userRouter.get('/:id', userController);


module.exports = userRouter;
