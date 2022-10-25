require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const taskRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const auth = require("./middlewares/auth");
const errorHandler = require("./errors/errorHandler");
const NotFoundError = require("./errors/NotFoundError");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use(auth);

app.use("/tasks", taskRouter);

app.use("*", (_req, _res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

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
