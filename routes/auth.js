const authRouter = require("express").Router();

const auth = require("../middlewares/auth");

const { login, createUser, check } = require("../controllers/auth");

// POST /signup - регистрация пользователя
authRouter.post("/signup", createUser);

// POST /signin - авторизация пользователя
authRouter.post("/signin", login);

// GET /auth - проверка наличия токена
authRouter.get("/auth", auth, check);

module.exports = authRouter;
