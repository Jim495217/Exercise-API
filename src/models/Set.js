const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Set = sequelize.define("Set", {
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Set;
