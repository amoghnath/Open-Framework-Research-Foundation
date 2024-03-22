const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const solutionController = require("../controllers/solutions/solution-controller");

const router = express.Router();

// POST /: Create a new solution
// This route handles POST requests to the root path of the solutions endpoint.
// It is protected by the `authenticateToken` middleware, which ensures that only
// authenticated users can access this route. The `requireRole("solver")` middleware
// further restricts access to users with the "solver" role, ensuring that only solvers
// can submit solutions.
// If the user is authenticated and authorized, the `create` method in the `solutionController`
// is invoked to process and store the new solution in the database.
router.post("/", authenticateToken, requireRole("solver"), solutionController.create);

// GET /: Retrieve all solutions submitted by the authenticated solver
// This route handles GET requests to the root path of the solutions endpoint.
// It uses the `authenticateToken` middleware to ensure that only authenticated users
// can access this route. Once authenticated, the `readAllBySolver` method in the
// `solutionController` is called to fetch and return all solutions submitted by the
// currently authenticated solver.
// This allows solvers to view all of their submitted solutions in one place.
router.get("/", authenticateToken, solutionController.readAllBySolver);

module.exports = router;