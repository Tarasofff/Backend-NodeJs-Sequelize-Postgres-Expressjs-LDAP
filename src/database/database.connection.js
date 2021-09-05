const Sequelize = require('sequelize').Sequelize;
const log = require('../logger/logger.connect');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_LOGIN, process.env.DATABASE_PASSWORD, {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    timezone: 'Europe/Kiev'
});

sequelize.sync({force: true}).then(() => log.info('Successful sync!')).catch(err=> log.fatal('In sync process was error: ', '\n', err));

module.exports = sequelize;
