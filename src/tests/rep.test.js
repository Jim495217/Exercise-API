// src/tests/rep.test.js
const request = require("supertest");
const app = require("../index");
const { Exercise, Set, Rep } = require("../models");
const testHelper = require("./setupTest");

beforeAll(async () => { await testHelper.setup(); });
beforeEach(async () => { await testHelper.reset(); });
afterAll(async () => { await testHelper.teardown(); });

describe("Rep CRUD", () => {
  test("POST /api/reps - create (201)", async () => {
    const ex = await Exercise.create({ name: "Lunge" });
    const set = await Set.create({ number: 1, ExerciseId: ex.id });
    const res = await request(app).post("/api/reps").send({ setId: set.id, count: 8, weight: 45 }).expect(201);
    expect(res.body.count).toBe(8);
  });

  test("POST /api/reps - missing fields returns 400", async () => {
    await request(app).post("/api/reps").send({}).expect(400);
  });

  test("POST /api/reps - set not found returns 404", async () => {
    await request(app).post("/api/reps").send({ setId: 9999, count: 5 }).expect(404);
  });

  test("PUT /api/reps/:id - update (200)", async () => {
    const ex = await Exercise.create({ name: "Lunge" });
    const set = await Set.create({ number: 1, ExerciseId: ex.id });
    const rep = await Rep.create({ count: 5, weight: 20, SetId: set.id });
    const res = await request(app).put(`/api/reps/${rep.id}`).send({ count: 6 }).expect(200);
    expect(res.body.count).toBe(6);
  });

  test("DELETE /api/reps/:id - delete (200)", async () => {
    const ex = await Exercise.create({ name: "Lunge" });
    const set = await Set.create({ number: 1, ExerciseId: ex.id });
    const rep = await Rep.create({ count: 5, weight: 20, SetId: set.id });
    await request(app).delete(`/api/reps/${rep.id}`).expect(200);
    const found = await Rep.findByPk(rep.id);
    expect(found).toBeNull();
  });
});
