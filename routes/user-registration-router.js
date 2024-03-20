const express = require("express");
const uploaderController = require("../controllers/user-registration/register-uploader");
const solverController = require("../controllers/user-registration/register-solver");

const router = express.Router();

// Endpoint for registering an uploader
router.post("/uploader", uploaderController.register);

// Endpoint for registering a solver
router.post("/solver", solverController.register);

module.exports = router;