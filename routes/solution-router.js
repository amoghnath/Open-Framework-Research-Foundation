const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const solutionController = require("../controllers/solutions/solution-controller");

const router = express.Router();

/**
 * @swagger
 * /solution:
 *   get:
 *     summary: Retrieve all solutions submitted by the authenticated solver
 *     description: Fetch all solutions submitted by the currently authenticated solver. Requires authentication.
 *     tags:
 *      - solution
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of solutions submitted by the solver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solution'
 *       401:
 *         description: Unauthorized access
 */
router.get("/", authenticateToken, solutionController.readAllBySolver);

/**
 * @swagger
 * /solution:
 *   post:
 *     summary: Create a new solution
 *     description: Submit a new solution for a problem. Requires authentication and solver role.
 *     tags:
 *      - solution
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solution'
 *     responses:
 *       201:
 *         description: Solution created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solution'
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Access forbidden - user is not in the solver role
 */
router.post("/:problemId", authenticateToken, requireRole("solver"), solutionController.create);

module.exports = router;
