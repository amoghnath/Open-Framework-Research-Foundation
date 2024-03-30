const { Uploader } = require("../../models/Uploader");
const { Op } = require("sequelize");

const uploaderController = {
    async register(req, res) {
        try {
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

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(uploaderEmail) || !emailRegex.test(uploaderBusinessEmail)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            // Validate phone number length (10 digits)
            if (uploaderPhoneNumber.length !== 10 || !/^\d+$/.test(uploaderPhoneNumber)) {
                return res.status(400).json({ message: "Phone number must be 10 digits long" });
            }

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