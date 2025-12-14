const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Exercise = sequelize.define("Exercise", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  muscleGroup: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Exercise;
