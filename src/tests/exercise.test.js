// src/tests/exercise.test.js
const request = require("supertest");
const app = require("../index");
const { Exercise, User } = require("../models");
const testHelper = require("./setupTest");

beforeAll(async () => { await testHelper.setup(); });
beforeEach(async () => { await testHelper.reset(); });
afterAll(async () => { await testHelper.teardown(); });

describe("Exercise CRUD", () => {
  test("POST /api/exercises - success (201)", async () => {
    const res = await request(app)
      .post("/api/exercises")
      .send({ name: "Deadlift", muscleGroup: "Back" })
      .expect(201);
    expect(res.body.name).toBe("Deadlift");
  });

  test("POST /api/exercises - missing name -> 400", async () => {
    await request(app).post("/api/exercises").send({ muscleGroup: "Back" }).expect(400);
  });

  test("GET /api/exercises - list (200) and GET by id (200)", async () => {
    const ex = await Exercise.create({ name: "Squat", muscleGroup: "Legs" });
    const list = await request(app).get("/api/exercises").expect(200);
    expect(Array.isArray(list.body)).toBe(true);
    const get = await request(app).get(`/api/exercises/${ex.id}`).expect(200);
    expect(get.body.name).toBe("Squat");
  });

  test("GET /api/exercises/:id - invalid id returns 400", async () => {
    await request(app).get("/api/exercises/abc").expect(400);
  });

  test("GET /api/exercises/:id - not found returns 404", async () => {
    await request(app).get("/api/exercises/9999").expect(404);
  });

  test("PUT /api/exercises/:id - update (200)", async () => {
    const ex = await Exercise.create({ name: "Bench", muscleGroup: "Chest" });
    const res = await request(app)
      .put(`/api/exercises/${ex.id}`)
      .send({ name: "Bench Press" })
      .expect(200);
    expect(res.body.name).toBe("Bench Press");
  });

  test("DELETE /api/exercises/:id - deletes (200)", async () => {
    const ex = await Exercise.create({ name: "Row", muscleGroup: "Back" });
    await request(app).delete(`/api/exercises/${ex.id}`).expect(200);
    const found = await Exercise.findByPk(ex.id);
    expect(found).toBeNull();
  });
});
