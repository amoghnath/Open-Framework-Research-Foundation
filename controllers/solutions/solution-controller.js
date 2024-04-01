const { Solution } = require("../../models/Solution");
const { Problem } = require("../../models/Problem");
const jwt = require("jsonwebtoken");

const solutionController = {
    async create(req, res) {
        try {
            // Extract the JWT from the cookie
            const token = req.cookies["user-session-token"];
            if (!token) {
                return res.status(401).json({ message: "No token provided, cannot identify solver" });
            }

            // Decode the JWT to get the solverId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const solverId = decoded.solverId;

            if (!solverId) {
                return res.status(400).json({ message: "Unable to identify solver from token" });
            }

            // Extract the problemId from the URL parameter
            const { problemId } = req.params;
            if (!problemId) {
                return res.status(400).json({ message: "Problem ID is required" });
            }

            // Extract solution details from the request body
            const { solutionTitle, solutionDescription } = req.body;

            // Create a new solution record
            const newSolution = await Solution.create({
                solverId,
                problemId,
                solutionTitle,
                solutionDescription
            });

            res.status(201).json({
                message: "Solution submitted successfully",
                solution: newSolution
            });

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            res.status(500).json({ message: "Error submitting solution", error: error.message });
        }
    },

    async readAllBySolver(req, res) {
        try {
            // Extract the JWT from the cookie
            const token = req.cookies["user-session-token"];
            if (!token) {
                return res.status(401).json({ message: "No token provided, cannot identify solver" });
            }

            // Decode the JWT to get the solverId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const solverId = decoded.solverId;

            if (!solverId) {
                return res.status(400).json({ message: "Unable to identify solver from token" });
            }

            // Fetch all solutions for the solver including the associated problem details
            const solutions = await Solution.findAll({
                where: { solverId: solverId },
                include: [{
                    model: Problem,
                    required: true
                }]
            });

            if (!solutions || solutions.length === 0) {
                return res.status(404).json({ message: "No solutions found for the solver" });
            }

            res.status(200).json(solutions);

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            res.status(500).json({ message: "Error fetching solutions", error: error.message });
        }
    }

};

module.exports = solutionController;
