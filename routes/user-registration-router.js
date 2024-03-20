const express = require("express");
const uploaderController = require("../controllers/user-registration/register-uploader-controller");
const solverController = require("../controllers/user-registration/register-solver-controller");

const router = express.Router();

// Endpoint for registering an uploader
router.post("/uploader", uploaderController.register);

// Endpoint for registering a solver
router.post("/solver", solverController.register);

module.exports = router;