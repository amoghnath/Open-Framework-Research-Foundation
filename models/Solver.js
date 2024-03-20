const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const Solver = sequelize.define(
    "Solver",
    {
        // Define model attributes
        solverId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        solverEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        solverPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        solverFullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        solverPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 15],
            },
        },
        solverUniversityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        solverUniversityEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        solverUniversityAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "Solvers",
        timestamps: true,

        // Add Sequelize hooks for hashing the password
        hooks: {
            beforeCreate: async (solver) => {
                if (solver.solverPassword) {
                    const salt = await bcrypt.genSalt(10);
                    solver.solverPassword = await bcrypt.hash(solver.solverPassword, salt);
                }
            }
        }
    }
);

module.exports = Solver;
