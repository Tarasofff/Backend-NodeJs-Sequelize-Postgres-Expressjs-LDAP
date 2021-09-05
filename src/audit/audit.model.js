const Sequelize = require('sequelize');
const dbConnection = require('../database/database.connection');

const Audit = dbConnection.define('audit', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    event: {
       type: Sequelize.STRING,
        allowNull: false,
        validate: {
           isIn: [['create', 'update', 'delete']]
        }
    },

    ldapUsername: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    userChangeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    tableName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    columnName: {
        type: Sequelize.STRING(2048),
    },

    prevValue: {
        type: Sequelize.STRING(2048)
    },

    currentValue: {
        type: Sequelize.STRING(2048)
    },

    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
})

module.exports = Audit;