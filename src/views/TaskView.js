const { Console } = require("console");
const { Transform } = require("stream");

function table(input) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({
    transform(chunk, enc, cb) {
      cb(null, chunk);
    },
  });
  const logger = new Console({ stdout: ts });
  logger.table(input);
  const table = (ts.read() || "").toString();
  let result = "";
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, "┌");
    r = r.replace(/^├─*┼/, "├");
    r = r.replace(/│[^│]*/, "");
    r = r.replace(/^└─*┴/, "└");
    r = r.replace(/'/g, " ");
    result += `${r}\n`;
  }
  console.log(result);
}

class TaskView {
  constructor(tasks) {
    this.tasks = tasks.map((task) => ({
      id: task.id,
      name: task.name,
      description: task.description,
    }));
  }
  renderAll() {
    console.log("_______________________________________________\n");
    console.log("Suas tarefas:");
    table(this.tasks);
    console.log("_______________________________________________\n");
  }
}

module.exports = TaskView;
