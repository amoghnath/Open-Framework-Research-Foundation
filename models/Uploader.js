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

const UploaderSwaggerSchema = {
    Uploader: {
        type: "object",
        properties: {
            uploaderId: {
                type: "string",
                format: "uuid",
                description: "Unique identifier for the uploader"
            },
            uploaderEmail: {
                type: "string",
                format: "email",
                description: "Email address of the uploader"
            },
            // Don't include uploaderPassword in the Swagger schema to avoid exposing it in the documentation
            uploaderFullName: {
                type: "string",
                description: "Full name of the uploader"
            },
            uploaderPhoneNumber: {
                type: "string",
                description: "Phone number of the uploader"
            },
            uploaderBusinessName: {
                type: "string",
                description: "Business name associated with the uploader"
            },
            uploaderBusinessEmail: {
                type: "string",
                format: "email",
                description: "Business email of the uploader"
            },
            uploaderBusinessAddress: {
                type: "string",
                description: "Business address of the uploader"
            }
        }
    }
};

module.exports = { Uploader, UploaderSwaggerSchema };
