// src/db/seed.js
const bcrypt = require("bcrypt");
const { sequelize, User, Exercise, Set, Rep } = require("../models");

const SALT_ROUNDS = 10;

async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function seed() {
  const t = await sequelize.transaction();
  try {
    console.log("🔁 Starting seed...");

    // --- Create users ---
    const usersData = [
      { username: "alice", password: "password123", role: "user" },
      { username: "bob", password: "collabpass", role: "collaborator" }
    ];

    const users = [];
    for (const u of usersData) {
      const passwordHash = await hashPassword(u.password);
      const user = await User.create(
        { username: u.username, passwordHash, role: u.role },
        { transaction: t }
      );
      users.push(user);
    }

    // --- Create exercises, sets, reps ---
    // Sample structure per user
    const exercisesByUser = {
      alice: [
        { name: "Barbell Back Squat", muscleGroup: "Legs" },
        { name: "Bench Press", muscleGroup: "Chest" }
      ],
      bob: [
        { name: "Pull Up", muscleGroup: "Back" },
        { name: "Overhead Press", muscleGroup: "Shoulders" }
      ]
    };

    const created = { users: users.length, exercises: 0, sets: 0, reps: 0 };

    for (const user of users) {
      const list = exercisesByUser[user.username] || [];
      for (const exData of list) {
        // create Exercise linked to user
        const exercise = await user.createExercise(
          { name: exData.name, muscleGroup: exData.muscleGroup },
          { transaction: t }
        );
        created.exercises++;

        // Create 3 sets per exercise
        for (let s = 1; s <= 3; s++) {
          const set = await exercise.createSet({ number: s }, { transaction: t });
          created.sets++;

          // Create reps for each set. Vary counts and weight a bit.
          const repCounts = [8, 8, 6]; // example pattern
          const repCount = repCounts[(s - 1) % repCounts.length];

          for (let r = 1; r <= repCount; r++) {
            // Use a simple weight scheme depending on exercise and user
            const baseWeight =
              exercise.name.toLowerCase().includes("squat") ? 135 :
              exercise.name.toLowerCase().includes("bench") ? 95 :
              exercise.name.toLowerCase().includes("press") ? 65 :
              exercise.name.toLowerCase().includes("pull") ? 0 : 50;

            // small variation
            const weight = baseWeight + (user.username === "alice" ? 0 : -10);

            await set.createRep({ count: 1, weight }, { transaction: t });
            created.reps++;
          }
        }
      }
    }

    await t.commit();
    console.log("✅ Seed complete!");
    console.log(`Created: ${created.users} users, ${created.exercises} exercises, ${created.sets} sets, ${created.reps} reps`);
    process.exit(0);
  } catch (err) {
    await t.rollback();
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
