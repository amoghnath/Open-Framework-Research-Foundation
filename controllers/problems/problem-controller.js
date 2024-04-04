const { Problem } = require("../../models/Problem");
const { Uploader } = require("../../models/Uploader");
const { Solution } = require("../../models/Solution");
const { Solver } = require("../../models/Solver");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendProblemNotificationEmails = async (solverEmails, problemDetails) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "amoghnath23@gmail.com",
            pass: `${process.env.NODEMAILER_GOOGLE_APP_PASS}`,
        },
    });

    for (const email of solverEmails) {
        const mailOptions = {
            from: '"Problem Notification" <amoghnath23@gmail.com>',
            to: email,
            subject: `New Problem Created: ${problemDetails.problemTitle}`,
            html: `
                <h1>${problemDetails.problemTitle}</h1>
                <p>${problemDetails.problemDescription}</p>
                <p>Reward: ${problemDetails.problemReward}</p>
                <p>Deadline: ${problemDetails.problemDeadlineDate}</p>
            `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: %s", info.messageId);
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    }
};

const problemController = {
    async create(req, res) {
        try {
            const token = req.cookies["user-session-token"];
            if (!token) {
                return res.status(401).json({ message: "No token provided, cannot identify uploader" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const uploaderId = decoded.uploaderId;

            if (!uploaderId) {
                return res.status(400).json({ message: "Unable to identify uploader from token" });
            }

            const { problemTitle, problemDescription, problemReward, problemDeadlineDate } = req.body;

            const newProblem = await Problem.create({
                uploaderId,
                problemTitle,
                problemDescription,
                problemReward,
                problemDeadlineDate
            });

            const solvers = await Solver.findAll({ attributes: ["solverEmail"] });
            const solverEmails = solvers.map(solver => solver.solverEmail);

            const problemDetails = {
                problemTitle,
                problemDescription,
                problemReward,
                problemDeadlineDate,
            };

            await sendProblemNotificationEmails(solverEmails, problemDetails);

            res.status(201).json({
                message: "Problem created successfully",
                problem: newProblem
            });

        } catch (error) {
            console.error("Problem creation error:", error);
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