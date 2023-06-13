const { Sequelize } = require("sequelize");
const credentials = require("./config/credentials");

const Database = new Sequelize(credentials);

 
module.exports = Database;
