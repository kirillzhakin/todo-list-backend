const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const ConflictError = require("../errors/ConflictError");
const ValidationError = require("../errors/ValidationError");
const CastError = require("../errors/CastError");
const ReqAuthError = require("../errors/ReqAuthError");

const { NODE_ENV, JWT_TOKEN } = process.env;

// Генератор токена
const generateJwt = (id, login) => {
  return jwt.sign(
    { id, login },
    NODE_ENV === "production" ? JWT_TOKEN : "dev-secret",
    { expiresIn: "7d" }
  );
};

// POST /signup - регистрация пользователя
const createUser = (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) {
    next(new ValidationError("Некорректный login или password"));
  }
  User.findOne({ where: { login } }).then((user) => {
    if (user) {
      next(new ConflictError("Пользователь уже существует"));
    }
  });
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ login, password: hash }))
    .then((user) => {
      const { id } = user;
      res.send({ id, login, password });
    })
    .catch((err) => next(err));
};

// POST /signin - авторизация пользователя
const login = (req, res, next) => {
  const { login, password } = req.body;
  User.findOne({ where: { login } })
    .then((user) => {
      if (!user) {
        return next(new CastError("Пользователь не найден"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(new ReqAuthError("Указан неверный пароль"));
      }

      const token = generateJwt(user.id, user.login);
      return res.send({ token });
    })
    .catch((err) => next(err));
};

// GET /auth - проверка наличия токена
const check = (req, res, _next) => {
  const token = generateJwt(req.user.id, req.user.login);
  return res.send({ token })
};

module.exports = {
  createUser,
  login,
  check,
};
