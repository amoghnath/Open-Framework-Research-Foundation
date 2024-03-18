// db/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ORFC', 'postgres', 'axtonshrekfucker', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
