// Environment and Module Imports
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const sequelize = require("./config/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Model Imports
const { UploaderSwaggerSchema } = require("./models/Uploader");
const { SolverSwaggerSchema } = require("./models/Solver");
const { ProblemSwaggerSchema } = require("./models/Problem");
const { SolutionSwaggerSchema } = require("./models/Solution");

// Router Imports
const registrationRouter = require("./routes/user-registration-router");
const loginRouter = require("./routes/user-auth-router");
const problemRouter = require("./routes/problem-router");

// Express App Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3001", // Allow only http://localhost:3001
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, // This allows the server to send cookies in the response
};

// Middleware Configuration
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.json()); // Parse JSON bodies

app.get('/api/auth/verifyToken', (req, res) => {
    const token = req.cookies['user-session-token'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token verification failed' });
        }

        // Optionally retrieve user details from the database and send it back
        res.json({ message: 'Token verified', user: decoded });
    });
});

// Swagger Documentation Setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Open Framework Research Foundation",
            version: "1.0.0",
            description: "API Documentation for Open Framework Research Foundation",
        },
        components: {
            schemas: {
                ...UploaderSwaggerSchema,
                ...SolverSwaggerSchema,
                ...ProblemSwaggerSchema,
                ...SolutionSwaggerSchema,
            }
        },
        servers: [{ url: `http://localhost:${PORT}/api`, description: "Local server development" }],
    },
    apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Database Connection Function
async function assertDatabaseConnectionOk() {
    console.log("Checking database connection...");
    try {
        await sequelize.authenticate();
        console.log("Database connection OK!");
        await sequelize.sync();
        console.log("Database synced!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw new Error("Database connection failed: " + error.message);
    }
}

// API Routes
app.use("/api/auth", loginRouter);
app.use("/api/register", registrationRouter);
app.use("/api/problem", problemRouter);
app.get("/", (req, res) => res.send("Express server running on port 3000"));

// Start Server
assertDatabaseConnectionOk().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});