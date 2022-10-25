const authRouter = require("express").Router();

const { login, createUser } = require("../controllers/auth");

// POST /signup - регистрация пользователя
authRouter.post("/signup", createUser);

// POST /signin - авторизация пользователя
authRouter.post("/signin", login);

module.exports = authRouter;
