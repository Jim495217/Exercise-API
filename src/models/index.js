const sequelize = require("../db/connection");

const User = require("./User");
const Exercise = require("./Exercise");
const Set = require("./Set");
const Rep = require("./Rep");

// Associations
User.hasMany(Exercise, { foreignKey: "userId" });
Exercise.belongsTo(User, { foreignKey: "userId" });

Exercise.hasMany(Set, { foreignKey: "exerciseId" });
Set.belongsTo(Exercise, { foreignKey: "exerciseId" });

Set.hasMany(Rep, { foreignKey: "setId" });
Rep.belongsTo(Set, { foreignKey: "setId" });

// Sync DB
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(console.error);

module.exports = {
  sequelize,
  User,
  Exercise,
  Set,
  Rep
};
