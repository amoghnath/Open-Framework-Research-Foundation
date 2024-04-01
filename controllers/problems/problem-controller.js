const { Problem } = require("../../models/Problem");
const { Uploader } = require("../../models/Uploader");
const { Solution } = require("../../models/Solution");
const { Solver } = require("../../models/Solver");

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
    },

    async readAllByUploader(req, res) {
        console.log("readAllByUploader called");

        try {
            const token = req.cookies['user-session-token'];
            console.log("Token from cookie:", token);

            if (!token) {
                console.log("No token provided");
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded JWT:", decoded);

            const uploaderId = decoded.uploaderId;
            console.log("Uploader ID from JWT:", uploaderId);

            if (!uploaderId) {
                console.log("Unable to identify uploader from token");
                return res.status(400).json({ message: "Unable to identify uploader from token" });
            }

            // Fetch problems uploaded by this uploader and include associated solutions along with solver details
            const problems = await Problem.findAll({
                where: { uploaderId },
                include: [{
                    model: Solution,
                    required: false, // Include solutions even if they don't exist
                    include: [{
                        model: Solver, // Include the Solver model to get details of the solver
                        attributes: { exclude: ['solverPassword'] } // Exclude sensitive information like password
                    }]
                }]
            });

            console.log(`Number of problems found for uploader ${uploaderId}:`, problems.length);

            if (!problems.length) {
                console.log("No problems found for this uploader");
                return res.status(404).json({ message: "No problems found for this uploader" });
            }

            res.status(200).json(problems);
        } catch (error) {
            console.error('Error fetching problems and solutions:', error);
            res.status(500).json({ message: "Error fetching problems and solutions", error: error.message });
        }
    }


};

module.exports = problemController;