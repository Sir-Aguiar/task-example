class TaskView {
  constructor(tasks) {
    this.tasks = tasks;
  }
  renderAll() {
    console.log("_______________________________________________\n");
    console.log("Suas tarefas:");
    this.tasks.forEach((task) => {
      console.log(`[${task.id}] - ${task.name}: ${task.description}`);
    });
    console.log("_______________________________________________\n");
  }
}

module.exports = TaskView;
