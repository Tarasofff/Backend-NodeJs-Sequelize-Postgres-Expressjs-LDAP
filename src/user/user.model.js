const dbConnection = require('../database/database.connection');
const Sequelize = require('sequelize');
const FileMetadata = require('../file/file.metadata.model');

const User = dbConnection.define("user", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    phoneNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },

    additionalPhoneNumber: {
        type: Sequelize.STRING(50),
        unique: true,
    },

    privateEmail: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
    },

    businessEmail: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
    },

    registrationAddress: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    position: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    manager: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    cvFileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },

    photoFileId: {
        type: Sequelize.INTEGER,
        unique: true,
    },

    passport: {
        type: Sequelize.STRING(60),
        unique: true
    },

    dateOfIssue: {
        type: Sequelize.DATE
    },

    inn: {
        type: Sequelize.STRING,
        unique: true
    },

    innFileId: {
        type: Sequelize.INTEGER,
        unique: true,
    },

    firstWorkday: {
        type: Sequelize.DATE,
        allowNull: false
    },

    salary: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    salaryNotes: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    ldapUsername: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.belongsTo(FileMetadata, {
    foreignKey: 'INNFileId'
})

User.belongsTo(FileMetadata, {
    foreignKey: 'photoFileId'
})

User.belongsTo(FileMetadata, {
    foreignKey: 'CVFileId'
})

module.exports = User;



