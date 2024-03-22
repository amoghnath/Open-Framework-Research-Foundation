// Solution model

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Solver } = require("./Solver");
const { Problem } = require("./Problem"); // Import the Problem model

const Solution = sequelize.define(
    "Solution",
    {
        solutionId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        solverId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Solver,
                key: "solverId",
            }
        },
        problemId: { // Add problemId to reference the Problem model
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Problem,
                key: "problemId",
            }
        },
        solutionTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        solutionDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "Solutions",
        timestamps: true,
    }
);

const SolutionSwaggerSchema = {
    Solution: {
        type: "object",
        properties: {
            solutionId: {
                type: "string",
                format: "uuid",
                description: "Unique identifier for the solution"
            },
            solverId: {
                type: "string",
                format: "uuid",
                description: "Identifier for the solver who provided the solution"
            },
            problemId: {
                type: "string",
                format: "uuid",
                description: "Identifier for the problem that this solution addresses"
            },
            solutionTitle: {
                type: "string",
                description: "Title of the solution"
            },
            solutionDescription: {
                type: "string",
                description: "Detailed description of the solution"
            }
        }
    }
};

// Associations
Solution.belongsTo(Solver, { foreignKey: "solverId" });
Solver.hasMany(Solution, { foreignKey: "solverId" });

Solution.belongsTo(Problem, { foreignKey: "problemId" }); // Solution belongs to Problem
Problem.hasMany(Solution, { foreignKey: "problemId" }); // Problem has many Solutions

module.exports = { Solution, SolutionSwaggerSchema };