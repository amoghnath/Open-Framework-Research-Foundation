const express = require("express");
const authController = require("../controllers/user-authentication/auth-controller");

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User authentication
 *     description: Login endpoint for uploader or solver. Returns a JWT token if authentication is successful.
 *     tags:
 *      - authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user
 *               role:
 *                 type: string
 *                 description: Role of the user (uploader or solver)
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   format: jwt
 *       401:
 *         description: Authentication failed
 *       400:
 *         description: Invalid role specified
 *       500:
 *         description: Error during authentication
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logout endpoint for the user. Clears the user's session token.
 *     tags:
 *      - authentication
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error during logout
 */
router.post("/logout", authController.logout);


module.exports = router;