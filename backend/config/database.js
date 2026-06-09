const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("notedb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
