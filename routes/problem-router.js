const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const problemController = require("../controllers/problems/problem-controller");

const router = express.Router();

/**
 * @swagger
 * /problem:
 *   get:
 *     summary: List all problems
 *     description: Retrieve a list of all problems available in the database.
 *     tags:
 *      - problem
 *     responses:
 *       200:
 *         description: A list of problems.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Problem'
 */
router.get("/", problemController.readAll);

/**
 * @swagger
 * /problem/{problemId}:
 *   get:
 *     summary: Retrieve a specific problem
 *     description: Fetch details of a specific problem by its ID.
 *     tags:
 *       - problem
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         description: Unique ID of the problem to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of a problem.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Problem not found.
 */
router.get("/:problemId", problemController.read);

/**
 * @swagger
 * /problem:
 *   post:
 *     summary: Create a new problem
 *     description: Add a new problem to the database. Requires uploader role.
 *     tags:
 *       - problem
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Problem'
 *     responses:
 *       201:
 *         description: Problem created successfully.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Forbidden action, role not allowed.
 */
router.post("/", authenticateToken, requireRole("uploader"), problemController.create);

module.exports = router;
