const Sequelize = require('sequelize');
const dbConnection = require('../database/database.connection');

const FileMetadata = dbConnection.define('fileMetadata',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    mimetype: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    size: {
        type: Sequelize.BIGINT,
        allowNull: false
    },

    contentFolderPath: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

module.exports = FileMetadata;