const Task = require("./database/models/Task");
const MenuView = require("./views/MenuView");
const TaskView = require("./views/TaskView");
/* 
Criar um programa para gerenciamento de tarefas, utilizando a arquitetura MVC e que tenha os seguintes requisitos: 
  - Tenha um menu onde o usuário pode  
    - Criar tarefa
    - Listar tarefas 
    - Deletar tarefa 
    - Sair do programa
*/

const getAllTasks = async () => {
  const allTasks = await Task.findAll({
    logging: false,
  });
  const taskData = allTasks.map((task) => task.toJSON());
  return taskData;
};

class TaskController {
  constructor(tasks) {
    this.taskView = new TaskView(tasks);
  }

  async updateView() {
    this.taskView = new TaskView(await getAllTasks());
  }

  async handleMenu() {
    const choice = MenuView.renderMenu(["Criar tarefa", "Listar tarefas", "Deletar tarefa"]);
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
      await Task.create({ name, description }, { logging: false });
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
      await Task.destroy({ where: { id: taskId }, logging: false });

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

(async () => {
  const MyTaskController = new TaskController(await getAllTasks());
  MyTaskController.handleMenu();
})();
