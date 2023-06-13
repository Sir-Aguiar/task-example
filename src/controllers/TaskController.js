const Task = require("../database/models/Task");
const { getSessionTasks } = require("../utils/get-task");
const MenuView = require("../views/MenuView");
const TaskView = require("../views/TaskView");

class TaskController {
  constructor(tasks, session_id) {
    this.session_id = session_id;
    this.taskView = new TaskView(tasks);
  }

  async updateView() {
    this.taskView = new TaskView(await getSessionTasks(this.session_id));
  }

  async handleMenu() {
    const choice = MenuView.renderMenu(["Criar tarefa", "Listar tarefas", "Deletar tarefa"], this.session_id);
    console.clear();
    if (choice == 0) await this.addTask();
    if (choice == 1) await this.listTasks();
    if (choice == 2) await this.deleteTask();
  }

  loadMenu(timing = 1500) {
    setTimeout(() => {
      console.clear();
      this.handleMenu();
    }, timing);
  }

  async addTask() {
    try {
      const { name, description } = MenuView.renderAddMenu();
      const lastTask = this.taskView.tasks[this.taskView.tasks.length - 1];
      await Task.create(
        { id: lastTask ? lastTask.id + 1 : 0, session_id: this.session_id, name, description },
        { logging: false },
      );
      await this.updateView();

      console.clear();
      console.log("Tarefa criada com sucesso");
      this.loadMenu();
    } catch (e) {
      console.clear();
      console.log(e.message);
      this.loadMenu();
    }
  }

  async listTasks() {
    this.taskView.renderAll();
    this.handleMenu();
  }

  async deleteTask() {
    try {
      this.taskView.renderAll();
      const taskId = MenuView.renderDeleteMenu();
      await Task.destroy({ where: { id: taskId, session_id: this.session_id }, logging: false });

      console.clear();
      await this.updateView();
      console.log("Tarefa excluída com sucesso");
      this.loadMenu();
    } catch (e) {
      console.clear();
      console.log(e.message);
      this.loadMenu();
    }
  }
}

module.exports = TaskController;
