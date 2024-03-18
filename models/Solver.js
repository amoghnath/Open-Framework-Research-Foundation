const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Ensure this path points to your Sequelize instance

const Solver = sequelize.define(
    "Solver",
    {
        // Define model attributes
        solverId: {
            type: DataTypes.UUID, // Use UUID as the data type for the ID
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID for new records
            allowNull: false,
        },
        solverEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Validates the email format
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
                isNumeric: true, // Validates that the string contains only numbers
                len: [10, 15], // Assumes phone numbers are between 10 and 15 characters
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
                isEmail: true, // Validates the email format
            },
        },
        solverUniversityAddress: {
            type: DataTypes.TEXT, // TEXT type is used for longer strings
            allowNull: false, // Assuming a business address is required
        },
    },
    {
        // Model options
        tableName: "Solvers", // Explicitly specifies table name
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

module.exports = Solver;
