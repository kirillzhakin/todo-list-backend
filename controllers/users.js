const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/models");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const ValidationError = require("../errors/ValidationError");

// GET /users — возвращает всех пользователей
const usersController = (_req, res, next) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

// GET /users/:id - возвращает пользователя по id
const userController = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new CastError("Некорректные данные"));
      } else {
        next(err);
      }
    });
};

// GET /users/me - возвращает информацию о пользователе (login и имя)
const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь не найден"));
      }
      return res.send(...user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  usersController,
  userController,
  getMe,
};
