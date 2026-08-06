const request = require("supertest");

const app = require("../app");

const Assignment = require("../models/Assignment");
const User = require("../models/User");
const Course = require("../models/Course");


describe("Assignments GET endpoints", () => {

  test("GET /assignments should return all assignments", async () => {

    const user = await User.create({
      name: "Assignment User",
      email: "assignmentuser@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Backend Development",
      instructor: "John Smith",
      semester: "Fall 2026",
      credits: 3
    });


    await Assignment.create({
      userId: user._id,
      courseId: course._id,
      title: "Create API",
      description: "Build a REST API using Express",
      dueDate: new Date("2026-09-15"),
      priority: "High",
      status: "Pending"
    });


    const response = await request(app)
      .get("/assignments");


    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty(
      "title",
      "Create API"
    );

  });


  test("GET /assignments/{id} should return a single assignment", async () => {

    const user = await User.create({
      name: "Single Assignment User",
      email: "singleassignment@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Node.js",
      instructor: "Jane Doe",
      semester: "Spring 2027",
      credits: 4
    });


    const assignment = await Assignment.create({
      userId: user._id,
      courseId: course._id,
      title: "Authentication Project",
      description: "Implement OAuth authentication",
      dueDate: new Date("2026-10-01"),
      priority: "Medium",
      status: "Pending"
    });


    const response = await request(app)
      .get(`/assignments/${assignment._id}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      "title",
      "Authentication Project"
    );

  });

});