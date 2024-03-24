const express = require("express");
const uploaderController = require("../controllers/user-registration/register-uploader-controller");
const solverController = require("../controllers/user-registration/register-solver-controller");

const router = express.Router();

/**
 * @swagger
 * /register/uploader:
 *   post:
 *     summary: Register a new uploader
 *     description: Endpoint for registering a new uploader.
 *     tags:
 *       - registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Uploader'
 *     responses:
 *       201:
 *         description: Uploader registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Uploader'
 *       400:
 *         description: Invalid request data
 */
router.post("/uploader", uploaderController.register);

/**
 * @swagger
 * /register/solver:
 *   post:
 *     summary: Register a new solver
 *     description: Endpoint for registering a new solver.
 *     tags:
 *      - registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solver'
 *     responses:
 *       201:
 *         description: Solver registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solver'
 *       400:
 *         description: Invalid request data
 */
router.post("/solver", solverController.register);

module.exports = router;
