const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Uploader = require("./Uploader");

const Problem = sequelize.define(
    "Problem",
    {
        problemId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        uploaderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Uploader,
                key: "uploaderId"
            }
        },
        problemTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        problemDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        problemReward: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        problemDeadlineDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "Problems",
        timestamps: true,
    }
);

Problem.belongsTo(Uploader, { foreignKey: "uploaderId" });
Uploader.hasMany(Problem, { foreignKey: "uploaderId" });

// Swagger schema definition
const ProblemSwaggerSchema = {
    Problem: {
        type: "object",
        properties: {
            problemId: {
                type: "string",
                format: "uuid",
                description: "Unique identifier for the problem"
            },
            uploaderId: {
                type: "string",
                format: "uuid",
                description: "Identifier for the uploader of the problem"
            },
            problemTitle: {
                type: "string",
                description: "Title of the problem"
            },
            problemDescription: {
                type: "string",
                description: "Description of the problem"
            },
            problemReward: {
                type: "integer",
                description: "Reward for solving the problem"
            },
            problemDeadlineDate: {
                type: "string",
                format: "date-time",
                description: "Deadline for solving the problem"
            }
        }
    }
};

module.exports = {
    Problem,
    ProblemSwaggerSchema
};
