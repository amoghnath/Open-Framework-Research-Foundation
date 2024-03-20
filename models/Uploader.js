const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

// Define the Uploader model
const Uploader = sequelize.define(
    "Uploader",
    {
        // Define attributes (table columns)
        uploaderId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        uploaderEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        uploaderPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploaderFullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploaderPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 10],
            },
        },
        uploaderBusinessName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploaderBusinessEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        uploaderBusinessAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "Uploaders",
        timestamps: true,

        // Add Sequelize hooks for hashing the password
        hooks: {
            beforeCreate: async (uploader) => {
                if (uploader.uploaderPassword) {
                    const salt = await bcrypt.genSalt(10);
                    uploader.uploaderPassword = await bcrypt.hash(uploader.uploaderPassword, salt);
                }
            }
        }
    }
);

module.exports = Uploader;
