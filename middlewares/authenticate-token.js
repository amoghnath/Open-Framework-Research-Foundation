const jwt = require("jsonwebtoken");

// This function can be used directly in route definitions to protect endpoints
const authenticateToken = (req, res, next) => {
    const token = req.cookies["user-session-token"];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired. Please log in again." });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ message: "Invalid token. Please log in again." });
            } else if (err.name === "NotBeforeError") {
                return res.status(403).json({ message: "Token not active. Please try again later." });
            } else {
                return res.status(403).json({ message: "Token verification failed." });
            }
        }

        req.user = user;
        next();
    });
};

// Role checking middleware
const requireRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: `Access denied. Requires ${role} role.` });
    }

    next();
};

module.exports = { authenticateToken, requireRole };
