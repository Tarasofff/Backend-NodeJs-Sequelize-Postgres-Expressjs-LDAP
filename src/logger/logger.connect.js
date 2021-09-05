const log4js = require('log4js');
const options = require('./logger.config');
log4js.configure(options);

const logger = log4js.getLogger();

module.exports = logger;