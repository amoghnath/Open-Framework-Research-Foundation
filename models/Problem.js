const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Uploader = require("./Uploader"); // Assuming Uploader model is in the same directory

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

// Define the association with Uploader (if not already defined in Uploader model)
Problem.belongsTo(Uploader, { foreignKey: "uploaderId" });
Uploader.hasMany(Problem, { foreignKey: "uploaderId" });

module.exports = Problem;
