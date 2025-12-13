// src/tests/set.test.js
const request = require("supertest");
const app = require("../index");
const { Exercise, Set } = require("../models");
const testHelper = require("./setupTest");

beforeAll(async () => { await testHelper.setup(); });
beforeEach(async () => { await testHelper.reset(); });
afterAll(async () => { await testHelper.teardown(); });

describe("Set CRUD", () => {
  test("POST /api/sets - create (201)", async () => {
    const ex = await Exercise.create({ name: "Pull Up" });
    const res = await request(app)
      .post("/api/sets")
      .send({ exerciseId: ex.id, number: 1 })
      .expect(201);
    expect(res.body.number).toBe(1);
  });

  test("POST /api/sets - missing fields returns 400", async () => {
    await request(app).post("/api/sets").send({}).expect(400);
  });

  test("POST /api/sets - exercise not found returns 404", async () => {
    await request(app).post("/api/sets").send({ exerciseId: 9999, number: 1 }).expect(404);
  });

  test("PUT /api/sets/:id - update (200)", async () => {
    const ex = await Exercise.create({ name: "Dip" });
    const set = await Set.create({ number: 1, ExerciseId: ex.id });
    const res = await request(app).put(`/api/sets/${set.id}`).send({ number: 2 }).expect(200);
    expect(res.body.number).toBe(2);
  });

  test("DELETE /api/sets/:id - delete (200)", async () => {
    const ex = await Exercise.create({ name: "Dip" });
    const set = await Set.create({ number: 1, ExerciseId: ex.id });
    await request(app).delete(`/api/sets/${set.id}`).expect(200);
    const found = await Set.findByPk(set.id);
    expect(found).toBeNull();
  });
});
