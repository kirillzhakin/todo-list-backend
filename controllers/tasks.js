const { Task } = require("../models/models");
const NotFoundError = require("../errors/NotFoundError");

// GET /tasks — возвращает все задачи
const tasksController = (_req, res, next) => {
  Task.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(err));
};

// GET /tasks — возвращает задачу
const taskController = (req, res, next) => {
  const { id } = req.params;
  Task.findOne({ where: { id } }).then((task) => {
    if (!task) next(new NotFoundError("Такой задачи не существует"));
    res.send(task);
  });
};

// POST /tasks — создаёт задачу
const createTask = (req, res, next) => {
  const { id, login } = req.user;
  const { title, date, priority, status, responsibleUser } = req.body;
  Task.create({
    title,
    date,
    priority,
    status,
    creatorUser: login,
    responsibleUser: responsibleUser,
    userId: id,
  })
    .then((task) => res.send(task))
    .catch((err) => next(err));
};

// DELETE /tasks/:id — удаляет карточку по идентификатору
const deleteTask = (req, res, next) => {
  const { id } = req.params;
  Task.findByPk(id)
    .then((task) => {
      if (!task) next(new NotFoundError("Такой задачи не существует"));
      task.destroy();
    })
    .then(() => res.send({ message: "Задача удалена" }))
    .catch((err) => next(err));
};

// PATCH /tasks/:id — обновляет задачу по идентификатору
const updateTask = (req, res, next) => {
  console.log(req.params, req.body);
  const { id } = req.params;
  const { title, date, priority, status, creatorUser, responsibleUser } =
    req.body;

  Task.findByPk(id).then((task) => {
    if (!task) next(new NotFoundError("Такой задачи не существует"));
    task
      .update({
        title,
        date,
        priority,
        status,
        creatorUser,
        responsibleUser,
      })
      .then((task) => {
        res.send(task);
      })
      .catch((err) => next(err));
  });
};

module.exports = {
  tasksController,
  taskController,
  createTask,
  deleteTask,
  updateTask,
};
