const { keyInSelect, question, questionInt } = require("readline-sync");
/* 
Criar um programa para gerenciamento de tarefas, utilizando a arquitetura MVC e que tenha os seguintes requisitos: 
  - Tenha um menu onde o usuário pode  
    - Criar tarefa
    - Listar tarefas 
    - Deletar tarefa 
    - Sair do programa
*/

// Representação do meu model, através desta classe eu gerencio meu "banco de dados", podendo adicionar e excluir elementos, apenas.
class TaskDatabase {
  constructor() {
    // Criando uma propriedade this.TaskList que não pode ter sua referência de memória alterada.
    Object.defineProperty(this, "TaskList", {
      writable: false,
      enumerable: true,
      value: [],
    });
  }

  getTaskList() {
    return this.TaskList;
  }

  addTask(task) {
    const { name, description } = task;
    // Aplicando uma regra de negócio à todas propriedades da minha task
    for (const key in task) {
      if (!task[key]) {
        throw new Error("Sua tarefa deve possuir um nome e uma descrição");
      }
    }

    const lastId = this.TaskList[this.TaskList.length - 1];

    this.TaskList.push({
      id: lastId ? lastId.id + 1 : 0,
      name,
      description,
    });
  }

  removeTask(task_id) {
    // Encontrando a posição em que se encontra a task desejada
    const taskIndex = this.TaskList.findIndex((value) => value.id === task_id);
    if (taskIndex == -1) {
      throw new Error("Esta tarefa não existe");
    }
    this.TaskList.splice(taskIndex, 1);
  }
}

class TaskView {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }
  renderAll() {
    console.log("_______________________________________________\n");
    console.log("Suas tarefas:");
    this.taskModel.getTaskList().forEach((task) => {
      console.log(`[${task.id}] - ${task.name}: ${task.description}`);
    });
    console.log("_______________________________________________\n");
  }
}

class MenuView {
  static renderMenu(options) {
    return keyInSelect(options, "Digite a opção desejada", {
      cancel: "Sair do programa",
    });
  }
  static renderDeleteMenu() {
    return questionInt("Qual o número da tarefa que deseja deletar: ");
  }
  static renderAddMenu() {
    const name = question("Insira o nome da tarefa: ");
    const description = question("Insira a descrição da tarefa: ");
    return { name, description };
  }
}

class TaskController {
  constructor(taskModel) {
    this.taskModel = taskModel;
    this.taskView = new TaskView(taskModel);
  }

  handleMenu() {
    let choice = MenuView.renderMenu(["Criar tarefa", "Listar tarefas", "Deletar tarefa"]);
    console.clear();
    if (choice == 0) this.addTask();
    if (choice == 1) this.listTasks();
    if (choice == 2) this.deleteTask();
  }

  addTask() {
    try {
      const taskInfo = MenuView.renderAddMenu();
      this.taskModel.addTask(taskInfo);
      console.clear();
      this.handleMenu();
    } catch (e) {
      console.clear();
      console.log(e.message);
      setTimeout(() => {
        console.clear();
        this.handleMenu();
      }, 1500);
    }
  }

  listTasks() {
    this.taskView.renderAll();
    this.handleMenu();
  }

  deleteTask() {
    try {
      this.taskView.renderAll();
      const taskId = MenuView.renderDeleteMenu();
      this.taskModel.removeTask(taskId);

      console.clear();
      console.log("Tarefa excluída com sucesso");
      setTimeout(() => {
        console.clear();
        this.handleMenu();
      }, 1500);
    } catch (e) {
      console.clear();
      console.log(e.message);
      setTimeout(() => {
        console.clear();
        this.handleMenu();
      }, 1500);
    }
  }
}

const Database = new TaskDatabase();
const MyTaskController = new TaskController(Database);
MyTaskController.handleMenu();
