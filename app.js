require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const sequelize = require("./db");
const models = require("./models/models");
const taskRouter = require("./routes/tasks");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const errorHandler = require("./errors/errorHandler");
const NotFoundError = require("./errors/NotFoundError");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(requestLogger);

app.use("/", authRouter);
app.use(auth);
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.use("*", (_req, _res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

app.use(errorLogger);

const start = async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Подключен к базе данных");
    });
    await sequelize.sync();
    app.use(errorHandler, () => {
      console.log("Ошибка");
    });
    app.listen(PORT, () => console.log(`Порт ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
