const request = require("supertest");

const app = require("../app");

const Course = require("../models/Course");
const User = require("../models/User");


describe("Courses GET endpoints", () => {

  test("GET /courses should return all courses", async () => {

    const user = await User.create({
      name: "Course User",
      email: "courseuser@example.com"
    });


    await Course.create({
      userId: user._id,
      courseName: "Web Development",
      instructor: "John Smith",
      semester: "Fall 2026",
      credits: 3,
      description: "Full stack development course"
    });


    const response = await request(app)
      .get("/courses");


    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty(
      "courseName",
      "Web Development"
    );

  });


  test("GET /courses/{id} should return a single course", async () => {

    const user = await User.create({
      name: "Single Course User",
      email: "singlecourse@example.com"
    });


    const course = await Course.create({
      userId: user._id,
      courseName: "Database Systems",
      instructor: "Jane Doe",
      semester: "Spring 2027",
      credits: 4
    });


    const response = await request(app)
      .get(`/courses/${course._id}`);


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      "courseName",
      "Database Systems"
    );

  });

});