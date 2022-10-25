const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  creatorUser: { type: DataTypes.STRING },
  responsibleUser: { type: DataTypes.STRING },
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { User, Task };
