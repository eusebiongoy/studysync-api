const request = require("supertest");

const app = require("../app");
const User = require("../models/User");

describe("Users GET endpoints", () => {

  test("GET /users should return all users", async () => {

    await User.create({
      name: "Test User",
      email: "testuser@example.com",
      profileImage: "https://example.com/image.jpg",
      oauthProvider: "Google"
    });


    const response = await request(app)
      .get("/users");


    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty(
      "name",
      "Test User"
    );

    expect(response.body[0]).toHaveProperty(
      "email",
      "testuser@example.com"
    );

  });


  test("GET /users/{id} should return a single user", async () => {

    const user = await User.create({
      name: "Single User",
      email: "single@example.com"
    });

    const response = await request(app)
      .get(`/users/${user._id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      "name",
      "Single User"
    );

  });

});