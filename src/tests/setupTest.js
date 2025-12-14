// src/tests/setupTest.js
const { sequelize } = require("../models");

module.exports = {
  async setup() {
    // sync the models to the in-memory DB
    await sequelize.sync({ force: true });
  },

  async reset() {
    // truncate all tables so tests run independently
    const modelKeys = Object.keys(sequelize.models);
    for (const k of modelKeys) {
      await sequelize.models[k].destroy({ where: {}, force: true });
    }
  },

  async teardown() {
    await sequelize.close();
  }
};

