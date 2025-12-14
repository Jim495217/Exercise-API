const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Rep = sequelize.define("Rep", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Rep;
