// src/tests/user.test.js
const request = require("supertest");
const app = require("../index"); // your exported express app
const { User } = require("../models");
const testHelper = require("./setupTest");

beforeAll(async () => {
  await testHelper.setup();
});

beforeEach(async () => {
  await testHelper.reset();
});

afterAll(async () => {
  await testHelper.teardown();
});

describe("User CRUD", () => {
  test("POST /api/users - create user (201) and returns id", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ username: "testuser", passwordHash: "hashed", role: "user" }) // using passwordHash for simplicity
      .expect(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toBe("testuser");
  });

  test("POST /api/users - missing fields returns 400", async () => {
    const res = await request(app).post("/api/users").send({}).expect(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /api/users/:id - returns 200 for existing user", async () => {
    const u = await User.create({ username: "u1", passwordHash: "h", role: "user" });
    const res = await request(app).get(`/api/users/${u.id}`).expect(200);
    expect(res.body.username).toBe("u1");
  });

  test("GET /api/users/:id - 404 when not found", async () => {
    await request(app).get("/api/users/9999").expect(404);
  });

  test("PUT /api/users/:id - update user (200)", async () => {
    const u = await User.create({ username: "u2", passwordHash: "h", role: "user" });
    const res = await request(app)
      .put(`/api/users/${u.id}`)
      .send({ username: "u2-updated" })
      .expect(200);
    expect(res.body.username).toBe("u2-updated");
  });

  test("DELETE /api/users/:id - delete user (200)", async () => {
    const u = await User.create({ username: "u3", passwordHash: "h", role: "user" });
    await request(app).delete(`/api/users/${u.id}`).expect(200);
    const found = await User.findByPk(u.id);
    expect(found).toBeNull();
  });
});
