const taskRouter = require("express").Router();

const {
  tasksController,
  taskController,
  createTask,
  deleteTask,
  updateTask
} = require("../controllers/tasks");

// GET /tasks — возвращает все задачи
taskRouter.get("/", tasksController);

// GET /tasks/:id — возвращает задачу
taskRouter.get("/:id", taskController);

// POST /tasks — создаёт задачу
taskRouter.post("/", createTask);

// DELETE /tasks/:id — удаляет задачу по идентификатору
taskRouter.delete("/:id", deleteTask);

// PATCH /tasks/:id — обновляет задачу по идентификатору
taskRouter.patch("/:id", updateTask);

module.exports = taskRouter;
