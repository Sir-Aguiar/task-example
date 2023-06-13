const { getAllTasks } = require("./get-task");

const openSession = async () => {
  const allTasks = await getAllTasks();
  if (allTasks.length === 0) {
    return 0;
  }
  const lastTask = allTasks[allTasks.length - 1];
  return lastTask.session_id + 1;
};

module.exports = openSession;
