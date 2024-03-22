const Uploader = require("../../models/Uploader"); // Adjust the path based on your project structure
const { Op } = require("sequelize"); // Make sure to import Op from sequelize

const uploaderController = {
    async register(req, res) {
        try {
            // Extract and trim the uploader data from the request body
            let {
                uploaderEmail,
                uploaderPassword,
                uploaderFullName,
                uploaderPhoneNumber,
                uploaderBusinessName,
                uploaderBusinessEmail,
                uploaderBusinessAddress
            } = req.body;

            // Trim the string fields to remove leading/trailing spaces
            uploaderEmail = uploaderEmail.trim();
            uploaderPassword = uploaderPassword.trim();
            uploaderFullName = uploaderFullName.trim();
            uploaderPhoneNumber = uploaderPhoneNumber.trim();
            uploaderBusinessName = uploaderBusinessName.trim();
            uploaderBusinessEmail = uploaderBusinessEmail.trim();
            uploaderBusinessAddress = uploaderBusinessAddress.trim();

            // Check for existing records with the same email, phone number, or business email
            const existingUploader = await Uploader.findOne({
                where: {
                    [Op.or]: [
                        { uploaderEmail },
                        { uploaderPhoneNumber },
                        { uploaderBusinessEmail }
                    ]
                }
            });

            if (existingUploader) {
                return res.status(400).json({
                    message: "Registration failed: email, phone number, or business email already in use."
                });
            }

            // Create a new uploader record in the database
            const newUploader = await Uploader.create({
                uploaderEmail,
                uploaderPassword, // Ensure password hashing logic is in place in the model's beforeCreate hook
                uploaderFullName,
                uploaderPhoneNumber,
                uploaderBusinessName,
                uploaderBusinessEmail,
                uploaderBusinessAddress
            });

            // Send a response with the newly created uploader data
            res.status(201).json({
                message: "Uploader registered successfully",
                uploader: newUploader
            });

        } catch (error) {
            res.status(400).json({
                message: "Error registering uploader",
                error: error.message
            });
        }
    }
};

module.exports = uploaderController;