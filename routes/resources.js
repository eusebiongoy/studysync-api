const express = require("express");
const router = express.Router();

const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource
} = require("../controllers/resourceController");

const { validateResource } = require("../middleware/validate");


/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Academic resource management endpoints
 */


/**
 * @swagger
 * /resources:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get all resources
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 */
router.get("/", getResources);


/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get a single resource
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the resource
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 */
router.get("/:id", getResource);


/**
 * @swagger
 * /resources:
 *   post:
 *     tags:
 *       - Resources
 *     summary: Create a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 64f7b5d8a4e2d6f1c1234567
 *             courseId: 64f7b5d8a4e2d6f1c7654321
 *             title: MongoDB Documentation
 *             type: Link
 *             url: https://www.mongodb.com/docs/
 *             description: Official MongoDB learning documentation.
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - type
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", validateResource, createResource);


/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     tags:
 *       - Resources
 *     summary: Update a resource
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the resource
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated MongoDB Guide
 *             type: Video
 *             url: https://example.com/video
 *             description: Updated resource information.
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found
 */
router.put("/:id", validateResource, updateResource);


/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     tags:
 *       - Resources
 *     summary: Delete a resource
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the resource
 *         schema:
 *           type: string
 *           example: 64f7b5d8a4e2d6f1c1234567
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */
router.delete("/:id", deleteResource);


module.exports = router;