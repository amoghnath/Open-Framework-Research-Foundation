const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const solutionController = require("../controllers/solutions/solution-controller");

const router = express.Router();

router.post("/", authenticateToken, requireRole('solver'), solutionController.create);