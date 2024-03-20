const Uploader = require('../../models/Uploader'); // Adjust the path based on your project structure

const uploaderController = {
    // Register a new uploader
    async register(req, res) {
        try {
            // Extract the uploader data from the request body
            const {
                uploaderEmail,
                uploaderPassword,
                uploaderFullName,
                uploaderPhoneNumber,
                uploaderBusinessName,
                uploaderBusinessEmail,
                uploaderBusinessAddress
            } = req.body;

            // Create a new uploader record in the database
            const newUploader = await Uploader.create({
                uploaderEmail,
                uploaderPassword,
                uploaderFullName,
                uploaderPhoneNumber,
                uploaderBusinessName,
                uploaderBusinessEmail,
                uploaderBusinessAddress
            });

            // Send a response with the newly created uploader data
            res.status(201).json({
                message: 'Uploader registered successfully',
                uploader: newUploader
            });

        } catch (error) {
            // Handle errors (e.g., validation errors, unique constraint errors)
            res.status(400).json({
                message: 'Error registering uploader',
                error: error.message
            });
        }
    }
};

module.exports = uploaderController;