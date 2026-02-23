const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  major: {
    type: DataTypes.STRING,
  },
}, {
  tableName: "profiles", 
  timestamps: false      
});

module.exports = Profile;
