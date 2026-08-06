const express = require("express");
const router = express.Router();

const {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require("../controllers/assignmentController");

const { validateAssignment } = require("../middleware/validate");
const isAuthenticated = require("../middleware/authentication");


/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment management endpoints
 */


/**
 * @swagger
 * /assignments:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get all assignments
 *     responses:
 *       200:
 *         description: Assignments retrieved successfully
 */
router.get("/", getAssignments);


/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get a single assignment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment found
 *       404:
 *         description: Assignment not found
 */
router.get("/:id", getAssignment);


/**
 * @swagger
 * /assignments:
 *   post:
 *     tags:
 *       - Assignments
 *     summary: Create a new assignment
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
 *               - courseId
 *               - title
 *               - dueDate
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64f7b5d8a4e2d6f1c1234567
 *               courseId:
 *                 type: string
 *                 example: 64f7b5d8a4e2d6f1c7654321
 *               title:
 *                 type: string
 *                 example: Build REST API Project
 *               description:
 *                 type: string
 *                 example: Create a complete backend API using Node.js and MongoDB.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-15
 *               status:
 *                 type: string
 *                 example: Pending
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", isAuthenticated, validateAssignment, createAssignment);


/**
 * @swagger
 * /assignments/{id}:
 *   put:
 *     tags:
 *       - Assignments
 *     summary: Update an assignment
 *     security:
 *       - googleOAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated REST API Project
 *               description:
 *                 type: string
 *                 example: Improve authentication and documentation.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-10-01
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 */
router.put("/:id", isAuthenticated, validateAssignment, updateAssignment);


/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     tags:
 *       - Assignments
 *     summary: Delete an assignment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 */
router.delete("/:id", deleteAssignment);


module.exports = router;