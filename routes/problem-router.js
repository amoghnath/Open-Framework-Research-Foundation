const express = require("express");
const { authenticateToken, requireRole } = require("../middlewares/authenticate-token");
const problemController = require("../controllers/problems/problem-controller");

const router = express.Router();

router.get("/", problemController.readAll)
router.post("/", authenticateToken, requireRole('uploader'), problemController.create);
router.get("/:problemId", problemController.read);

module.exports = router; 