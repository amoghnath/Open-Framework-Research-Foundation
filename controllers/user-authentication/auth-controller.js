const jwt = require('jsonwebtoken');
const Uploader = require('../../models/Uploader');
const Solver = require('../../models/Solver'); // Assuming you have a similar structure for Solver model
const bcrypt = require('bcryptjs');

const authController = {
    async login(req, res) {
        try {
            const { email, password, role } = req.body;

            // Check if the role is valid
            if (role !== 'uploader' && role !== 'solver') {
                return res.status(400).json({ message: 'Invalid role specified' });
            }

            // Find the user by email depending on the role
            let user;
            if (role === 'uploader') {
                user = await Uploader.findOne({ where: { uploaderEmail: email } });
            } else if (role === 'solver') {
                // Assuming the Solver model has a field named 'solverEmail'
                user = await Solver.findOne({ where: { solverEmail: email } });
            }

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }

            // Check if the password is correct
            const userPassword = role === 'uploader' ? user.uploaderPassword : user.solverPassword; // Adjust if Solver model has a different field name for password
            const isMatch = await bcrypt.compare(password, userPassword);
            if (!isMatch) {
                return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }

            // Generate JWT payload
            let userDetails;
            if (role === 'uploader') {
                userDetails = {
                    uploaderId: user.uploaderId,
                    role: role,
                    uploaderEmail: user.uploaderEmail,
                    uploaderFullName: user.uploaderFullName,
                    uploaderBusinessName: user.uploaderBusinessName,
                    uploaderBusinessEmail: user.uploaderBusinessEmail,
                };
            } else if (role === 'solver') {
                // Adjust the details according to the Solver model
                userDetails = {
                    solverId: user.solverId,
                    role: role,
                    solverEmail: user.solverEmail,
                    solverFullName: user.solverFullName,
                    solverUniversityName: user.solverUniversityName,
                    solverUniversityEmail: user.solverUniversityEmail,
                };
            }

            // User authenticated, generate a JWT with user details
            const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send the JWT as a cookie in the response
            res.cookie("user-session-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000, // 1 hour
            });

            // Send the JWT to the client
            res.json({
                message: 'Authentication successful',
                token: token
            });

        } catch (error) {
            res.status(500).json({ message: 'Error during authentication', error: error.message });
        }
    }
};

module.exports = authController;
