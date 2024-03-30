const { Problem } = require("../../models/Problem");
const { Uploader } = require("../../models/Uploader");
const jwt = require("jsonwebtoken");

const problemController = {
    async create(req, res) {
        try {
            // Extract the JWT from the cookie
            const token = req.cookies["user-session-token"];
            if (!token) {
                return res.status(401).json({ message: "No token provided, cannot identify uploader" });
            }

            // Decode the JWT to get the uploaderId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const uploaderId = decoded.uploaderId;

            if (!uploaderId) {
                return res.status(400).json({ message: "Unable to identify uploader from token" });
            }

            // Extract problem details from the request body
            const { problemTitle, problemDescription, problemReward, problemDeadlineDate } = req.body;

            // Create a new problem record
            const newProblem = await Problem.create({
                uploaderId,
                problemTitle,
                problemDescription,
                problemReward,
                problemDeadlineDate
            });

            res.status(201).json({
                message: "Problem created successfully",
                problem: newProblem
            });

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            res.status(500).json({ message: "Error creating problem", error: error.message });
        }
    },

    async readAll(req, res) {
        try {
            const problems = await Problem.findAll();
            res.status(200).json(problems);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving problems", error: error.message });
        }
    },

    async read(req, res) {
        try {
            const { problemId } = req.params; // Extract the problem ID from the route parameters

            // Use Sequelize's findByPk method to fetch the problem along with the uploader details
            const problem = await Problem.findByPk(problemId, {
                include: [{
                    model: Uploader,
                    attributes: {
                        exclude: ['uploaderPassword'] // Exclude sensitive information like password
                    }
                }]
            });

            if (!problem) {
                return res.status(404).json({ message: "Problem not found" });
            }

            res.status(200).json(problem);
        } catch (error) {
            res.status(500).json({ message: "Error fetching problem", error: error.message });
        }
    }

};

module.exports = problemController;