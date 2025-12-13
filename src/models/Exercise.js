const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Exercise = sequelize.define("Exercise", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    muscleGroup: {
      type: DataTypes.STRING
    }
  });

  return Exercise;
};
