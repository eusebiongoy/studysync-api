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
 *         description: List of courses
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               courseName:
 *                 type: string
 *               instructor:
 *                 type: string
 *               semester:
 *                 type: string
 *               credits:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post("/", validateCourse, createCourse);


/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put("/:id", updateCourse);


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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete("/:id", deleteCourse);


module.exports = router;