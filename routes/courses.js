const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const { validateCourse } = require("../middleware/validate");
const isAuthenticated = require("../middleware/authentication");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management endpoints
 */


/**
 * @swagger
 * /courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 */
router.get("/", getCourses);


/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get a single course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 */
router.get("/:id", getCourse);


/**
 * @swagger
 * /courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     security:
 *       - googleOAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseName
 *               - instructor
 *               - semester
 *               - credits
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64f7b5d8a4e2d6f1c1234567
 *               courseName:
 *                 type: string
 *                 example: Web Development
 *               instructor:
 *                 type: string
 *                 example: John Smith
 *               semester:
 *                 type: string
 *                 example: Fall 2026
 *               credits:
 *                 type: number
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: Introduction to full-stack web development.
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", isAuthenticated, validateCourse, createCourse);


/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update an existing course
 *     security:
 *       - googleOAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the course
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 example: Advanced Web Development
 *               instructor:
 *                 type: string
 *                 example: Jane Smith
 *               semester:
 *                 type: string
 *                 example: Spring 2027
 *               credits:
 *                 type: number
 *                 example: 4
 *               description:
 *                 type: string
 *                 example: Advanced backend and frontend development.
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 */
router.put("/:id", isAuthenticated, validateCourse, updateCourse);


/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete("/:id", deleteCourse);


module.exports = router;