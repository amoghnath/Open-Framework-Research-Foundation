const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const problemController = require("../controllers/problems/problem-controller");

const router = express.Router();

// GET /: List all problems
// This route responds to GET requests on the root path. It uses the `readAll` method
// from the `problemController` to fetch and return all problems from the database.
// No authentication is required to access this route, allowing anyone to view the list of problems.
router.get("/", problemController.readAll);

// GET /:problemId: Retrieve a specific problem
// This route responds to GET requests with a specific problem ID in the path (e.g., /12345).
// It uses the `read` method from the `problemController` to fetch and return the details of
// the specified problem from the database. Like the route to list all problems, this route does not
// require authentication, allowing public access to individual problem details.
router.get("/:problemId", problemController.read);

// POST /: Create a new problem
// This route responds to POST requests on the root path. It is protected by the `authenticateToken`
// middleware, which ensures that only authenticated users can access this route. Additionally,
// the `requireRole("uploader")` middleware checks if the authenticated user has the "uploader" role.
// If the user is authenticated and has the correct role, the `create` method in the `problemController`
// is called to create a new problem record in the database.
router.post("/", authenticateToken, requireRole("uploader"), problemController.create);

module.exports = router;
