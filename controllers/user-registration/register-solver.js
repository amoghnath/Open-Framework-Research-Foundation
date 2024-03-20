const Solver = require('../../models/Solver'); // Adjust the path as per your project structure

const solverController = {
    // Register a new solver
    async register(req, res) {
        try {
            // Extract the solver data from the request body
            const {
                solverEmail,
                solverPassword,
                solverFullName,
                solverPhoneNumber,
                solverUniversityName,
                solverUniversityEmail,
                solverUniversityAddress
            } = req.body;

            // Create a new solver record in the database
            const newSolver = await Solver.create({
                solverEmail,
                solverPassword, // The password will be hashed in the beforeCreate hook
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