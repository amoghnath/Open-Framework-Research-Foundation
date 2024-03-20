const Solver = require('../../models/Solver'); // Adjust the path based on your project structure
const { Op } = require('sequelize'); // Import the Op operator from Sequelize for queries

const solverController = {
    async register(req, res) {
        try {
            let {
                solverEmail,
                solverPassword,
                solverFullName,
                solverPhoneNumber,
                solverUniversityName,
                solverUniversityEmail,
                solverUniversityAddress
            } = req.body;

            // Trim the string fields to remove leading/trailing spaces
            solverEmail = solverEmail.trim();
            solverFullName = solverFullName.trim();
            solverPhoneNumber = solverPhoneNumber.trim();
            solverUniversityName = solverUniversityName.trim();
            solverUniversityEmail = solverUniversityEmail.trim();
            solverUniversityAddress = solverUniversityAddress.trim();

            // Check for existing records with the same email, phone number, or university email
            const existingSolver = await Solver.findOne({
                where: {
                    [Op.or]: [
                        { solverEmail },
                        { solverPhoneNumber },
                        { solverUniversityEmail }
                    ]
                }
            });

            if (existingSolver) {
                return res.status(400).json({
                    message: 'Registration failed: email, phone number, or university email already in use.'
                });
            }

            // Create a new solver record in the database
            const newSolver = await Solver.create({
                solverEmail,
                solverPassword, // The password should be hashed in the beforeCreate hook of the Solver model
                solverFullName,
                solverPhoneNumber,
                solverUniversityName,
                solverUniversityEmail,
                solverUniversityAddress
            });

            // Respond with the newly created solver data (excluding the password)
            res.status(201).json({
                message: 'Solver registered successfully',
                solver: newSolver
            });

        } catch (error) {
            // Handle errors (e.g., validation errors, unique constraint errors)
            res.status(400).json({
                message: 'Error registering solver',
                error: error.message
            });
        }
    }
};

module.exports = solverController;