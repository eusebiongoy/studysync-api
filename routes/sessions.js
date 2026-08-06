const express = require("express");
const router = express.Router();

const {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
} = require("../controllers/sessionController");

const { validateSession } = require("../middleware/validate");


/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Study session management endpoints
 */


/**
 * @swagger
 * /sessions:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get all study sessions
 *     responses:
 *       200:
 *         description: Study sessions retrieved successfully
 */
router.get("/", getSessions);


/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get a single study session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the session
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     responses:
 *       200:
 *         description: Study session found
 *       404:
 *         description: Study session not found
 */
router.get("/:id", getSession);


/**
 * @swagger
 * /sessions:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Create a study session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 64f7b5d8a4e2d6f1c1234567
 *             courseId: 64f7b5d8a4e2d6f1c7654321
 *             date: 2026-08-10
 *             duration: 120
 *             topic: Database Design
 *             notes: Reviewed MongoDB schemas and relationships.
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *               - date
 *               - duration
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: number
 *               topic:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Study session created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", validateSession, createSession);


/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     tags:
 *       - Sessions
 *     summary: Update a study session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the session
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             duration: 180
 *             topic: Advanced MongoDB
 *             notes: Completed database optimization exercises.
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: number
 *               topic:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Study session updated successfully
 *       404:
 *         description: Study session not found
 */
router.put("/:id", validateSession, updateSession);


/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     tags:
 *       - Sessions
 *     summary: Delete a study session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the session
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     responses:
 *       200:
 *         description: Study session deleted successfully
 *       404:
 *         description: Study session not found
 */
router.delete("/:id", deleteSession);


module.exports = router;