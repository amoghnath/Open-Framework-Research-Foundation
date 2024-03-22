require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const sequelize = require("./config/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { ProblemSwaggerSchema } = require("./models/Problem");

const registrationRouter = require("./routes/user-registration-router");
const loginRouter = require("./routes/user-auth-router");
const problemRouter = require("./routes/problem-router");

// Initialize Express app
const app = express();

// Swagger setup
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
                ...ProblemSwaggerSchema
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use middleware
app.use(cookieParser());
app.use(helmet());
app.use(express.json()); // Parse JSON bodies

// Use the routers with their respective base paths
app.use("/api/auth", loginRouter);
app.use("/api/register", registrationRouter);
app.use("/api/problem", problemRouter);

// Test database connection and sync models
async function assertDatabaseConnectionOk() {
    console.log("Checking database connection...");
    try {
        await sequelize.authenticate();
        console.log("Database connection OK!");
        await sequelize.sync();
        console.log("Database synced!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Define a route for GET requests to the root URL ('/')
app.get("/", (req, res) => {
    res.send("Express server running on port 3000");
});

// Start the server after ensuring the database is connected and synced
assertDatabaseConnectionOk().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});