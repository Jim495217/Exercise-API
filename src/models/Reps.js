const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Rep = sequelize.define("Rep", {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT
    }
  });

  return Rep;
};
