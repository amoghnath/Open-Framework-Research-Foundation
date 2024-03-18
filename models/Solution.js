// Solution model

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Solver = require("./Solver");
const Problem = require("./Problem"); // Import the Problem model

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
                key: 'solverId',
            }
        },
        problemId: { // Add problemId to reference the Problem model
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Problem,
                key: 'problemId',
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

// Associations
Solution.belongsTo(Solver, { foreignKey: 'solverId' });
Solver.hasMany(Solution, { foreignKey: 'solverId' });

Solution.belongsTo(Problem, { foreignKey: 'problemId' }); // Solution belongs to Problem
Problem.hasMany(Solution, { foreignKey: 'problemId' }); // Problem has many Solutions

module.exports = Solution;