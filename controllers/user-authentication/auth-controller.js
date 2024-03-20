const jwt = require('jsonwebtoken');
const Uploader = require('../../models/Uploader');
const Solver = require('../../models/Solver');
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
            const User = role === 'uploader' ? Uploader : Solver;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }

            // Check if the password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }

            // Generate JWT payload differently for uploader and solver
            let userDetails;
            if (role === 'uploader') {
                userDetails = {
                    id: user.id,
                    email: user.email,
                    role: role,
                    fullName: user.uploaderFullName,
                    phoneNumber: user.uploaderPhoneNumber,
                    businessName: user.uploaderBusinessName,
                    businessEmail: user.uploaderBusinessEmail,
                    businessAddress: user.uploaderBusinessAddress
                };
            } else if (role === 'solver') {
                userDetails = {
                    id: user.id,
                    email: user.email,
                    role: role,
                    fullName: user.solverFullName,
                    phoneNumber: user.solverPhoneNumber,
                    universityName: user.solverUniversityName,
                    universityEmail: user.solverUniversityEmail,
                    universityAddress: user.solverUniversityAddress
                };
            }

            // User authenticated, generate a JWT with user details
            const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send the JWT as a cookie in the response
            res.cookie("user-session-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure in production
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