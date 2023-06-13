/* 
Criar um programa para gerenciamento de tarefas, utilizando a arquitetura MVC e que tenha os seguintes requisitos: 
  - Tenha um menu onde o usuário pode  
    - Criar tarefa
    - Listar tarefas 
    - Deletar tarefa 
    - Sair do programa
*/

const { getSessionTasks } = require("./utils/get-task");
const TaskController = require("./controllers/TaskController");
const { questionInt } = require("readline-sync");
const openSession = require("./utils/open-session");

(async () => {
  let session;
  if (questionInt("Você já possui uma sessão [0 = Sim, 1 = Não]? ") === 1) {
    session = await openSession();
  } else {
    session = questionInt("Insira o ID da sua sessão: ");
  }
  const MyTaskController = new TaskController(await getSessionTasks(session), session);
  MyTaskController.handleMenu();
})();
