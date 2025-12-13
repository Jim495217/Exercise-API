const { sequelize } = require("../models");

async function setupDatabase() {
  try {
    console.log("🔄 Syncing database...");
    await sequelize.sync({ force: true });  // recreates tables
    console.log("✅ Database synced successfully!");
  } catch (err) {
    console.error("❌ Error syncing database:", err);
  } finally {
    await sequelize.close();
  }
}

setupDatabase();
