const jwt = require("jsonwebtoken");
const { Uploader } = require("../../models/Uploader");
const Solver = require("../../models/Solver"); // Assuming you have a similar structure for Solver model
const bcrypt = require("bcryptjs");

const authController = {
    /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User authentication
 *     description: Login endpoint for uploader or solver. Returns a JWT token if authentication is successful.
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

    async login(req, res) {
        try {
            const { email, password, role } = req.body;

            // Check if the role is valid
            if (role !== "uploader" && role !== "solver") {
                return res.status(400).json({ message: "Invalid role specified" });
            }

            // Find the user by email depending on the role
            let user;
            if (role === "uploader") {
                user = await Uploader.findOne({ where: { uploaderEmail: email } });
            } else if (role === "solver") {
                // Assuming the Solver model has a field named 'solverEmail'
                user = await Solver.findOne({ where: { solverEmail: email } });
            }

            if (!user) {
                return res.status(401).json({ message: "Authentication failed. User not found." });
            }

            // Check if the password is correct
            const userPassword = role === "uploader" ? user.uploaderPassword : user.solverPassword; // Adjust if Solver model has a different field name for password
            const isMatch = await bcrypt.compare(password, userPassword);
            if (!isMatch) {
                return res.status(401).json({ message: "Authentication failed. Wrong password." });
            }

            // Generate JWT payload
            let userDetails;
            if (role === "uploader") {
                userDetails = {
                    role: role,
                    uploaderId: user.uploaderId,
                    uploaderEmail: user.uploaderEmail,
                    uploaderFullName: user.uploaderFullName,
                };
            } else if (role === "solver") {
                // Adjust the details according to the Solver model
                userDetails = {
                    role: role,
                    solverId: user.solverId,
                    solverEmail: user.solverEmail,
                    solverFullName: user.solverFullName,
                };
            }

            // User authenticated, generate a JWT with user details
            const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Send the JWT as a cookie in the response
            res.cookie("user-session-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000, // 1 hour
            });

            // Send the JWT to the client
            res.json({
                message: "Authentication successful",
                token: token
            });

        } catch (error) {
            res.status(500).json({ message: "Error during authentication", error: error.message });
        }
    },

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: User logout
     *     description: Logout endpoint for the user. Clears the user's session token.
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

    async logout(req, res) {
        try {
            res.clearCookie("user-session-token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            });

            res.json({ message: "User logout successful" });
        } catch (error) {
            res.status(500).json({ message: "Error during user logout", error: error.message });
        }
    }
};

module.exports = authController;
