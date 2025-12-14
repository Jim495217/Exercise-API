const request = require("supertest");
const app = require("../index");

describe("Auth API", () => {
  it("registers a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });

  it("logs in a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "password123"
      });

    expect(res.body.token).toBeDefined();
  });
});
