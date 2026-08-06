const request = require("supertest");

const app = require("../app");

const Session = require("../models/Session");
const User = require("../models/User");
const Course = require("../models/Course");


describe("Sessions GET endpoints", () => {

  test("GET /sessions should return all study sessions", async () => {

    const user = await User.create({
      name: "Session User",
      email: "sessionuser@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Software Engineering",
      instructor: "John Smith",
      semester: "Fall 2026",
      credits: 3
    });


    await Session.create({
      userId: user._id,
      courseId: course._id,
      date: new Date("2026-08-10"),
      duration: 120,
      topic: "API Development",
      notes: "Practice Express and MongoDB"
    });


    const response = await request(app)
      .get("/sessions");


    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty(
      "topic",
      "API Development"
    );

  });


  test("GET /sessions/{id} should return a single study session", async () => {

    const user = await User.create({
      name: "Single Session User",
      email: "singlesession@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Database Design",
      instructor: "Jane Doe",
      semester: "Spring 2027",
      credits: 4
    });


    const session = await Session.create({
      userId: user._id,
      courseId: course._id,
      date: new Date("2026-09-01"),
      duration: 90,
      topic: "MongoDB Practice",
      notes: "Database exercises"
    });


    const response = await request(app)
      .get(`/sessions/${session._id}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      "topic",
      "MongoDB Practice"
    );

  });

});