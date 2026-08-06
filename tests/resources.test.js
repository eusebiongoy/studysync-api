const request = require("supertest");

const app = require("../app");

const Resource = require("../models/Resource");
const User = require("../models/User");
const Course = require("../models/Course");


describe("Resources GET endpoints", () => {

  test("GET /resources should return all resources", async () => {

    const user = await User.create({
      name: "Resource User",
      email: "resourceuser@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Web Development",
      instructor: "John Smith",
      semester: "Fall 2026",
      credits: 3
    });


    await Resource.create({
      userId: user._id,
      courseId: course._id,
      title: "Node.js Documentation",
      resourceType: "Documentation",
      link: "https://nodejs.org",
      description: "Official Node.js learning resource"
    });


    const response = await request(app)
      .get("/resources");


    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty(
      "title",
      "Node.js Documentation"
    );

  });


  test("GET /resources/{id} should return a single resource", async () => {

    const user = await User.create({
      name: "Single Resource User",
      email: "singleresource@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Programming Fundamentals",
      instructor: "Jane Doe",
      semester: "Spring 2027",
      credits: 4
    });


    const resource = await Resource.create({
      userId: user._id,
      courseId: course._id,
      title: "Express Guide",
      resourceType: "Tutorial",
      link: "https://expressjs.com",
      description: "Express framework guide"
    });

    const response = await request(app)
      .get(`/resources/${resource._id}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      "title",
      "Express Guide"
    );

  });

});