const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Set = sequelize.define("Set", {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Set;
