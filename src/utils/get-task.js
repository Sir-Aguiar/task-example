const Task = require("../database/models/Task");

const getSessionTasks = async (session_id) => {
  const allTasks = await Task.findAll({
    logging: false,
    where: {
      session_id: session_id,
    },
  });
  const taskData = allTasks.map((task) => task.toJSON());
  return taskData;
};

const getAllTasks = async () => {
  const allTasks = await Task.findAll({
    logging: false,
  });
  const taskData = allTasks.map((task) => task.toJSON());
  return taskData;
};

module.exports = { getAllTasks, getSessionTasks };
