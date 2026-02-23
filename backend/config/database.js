const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("notesdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
