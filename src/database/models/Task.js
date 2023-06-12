const { DataTypes } = require("sequelize");
const Database = require("../database");

const Task = Database.define("Task", {
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Task;
