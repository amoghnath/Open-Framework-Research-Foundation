const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// First, define the Uploader model
const Uploader = sequelize.define(
    "Uploader",
    {
        // Define attributes (table columns)
        uploaderId: {
            type: DataTypes.UUID, // Use UUID as the data type for the ID
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID for new records
            allowNull: false,
        },
        uploaderEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Validates that the string is an email
            },
        },
        uploaderPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploaderFullName: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming every uploader must have a name
        },
        uploaderPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming a phone number is required
            unique: true, // Assuming phone numbers must be unique
            validate: {
                isNumeric: true, // Validates that the string contains only numbers
                len: [10, 10], // Validates that the string is exactly 10 characters long
            },
        },
        uploaderBusinessName: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming every uploader has a business name
        },
        uploaderBusinessEmail: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming a business email is required
            unique: true, // Assuming business emails must be unique
            validate: {
                isEmail: true, // Validates that the string is an email
            },
        },
        uploaderBusinessAddress: {
            type: DataTypes.TEXT, // TEXT type is used for longer strings
            allowNull: false, // Assuming a business address is required
        },
    },
    {
        // Additional model options
        tableName: "Uploaders", // Explicitly specify the table name
        timestamps: true, // Sequelize automatically adds createdAt and updatedAt fields
    }
);

module.exports = Uploader;