const request = require("supertest");
const app = require("../index");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      username: "testuser",
      password: "password123"
    });

  token = res.body.token;
});

describe("Exercise API", () => {
  it("creates an exercise", async () => {
    const res = await request(app)
      .post("/api/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bench Press",
        muscleGroup: "Chest"
      });

    expect(res.statusCode).toBe(201);
  });

  it("gets exercises", async () => {
    const res = await request(app)
      .get("/api/exercises")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
