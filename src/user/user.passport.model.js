const dbConnection = require('../database/database.connection');
const Sequelize = require('sequelize');
const User = require('../user/user.model');
const FileMetadata = require('../file/file.metadata.model');

const UserPassport = dbConnection.define('user_passport', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    fileMetadataId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    }
})

UserPassport.belongsTo(User, {foreignKey: 'userId'})
UserPassport.belongsTo(FileMetadata, {foreignKey: 'fileMetadataId'})

module.exports = UserPassport;