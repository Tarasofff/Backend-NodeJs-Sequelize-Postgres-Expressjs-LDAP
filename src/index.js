require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});
const log = require('./logger/logger.connect');
const app = require('./web/config');

app.listen(process.env.PORT_BACKEND || 6000, () => log.info(`Server started on port: ${process.env.PORT_BACKEND || 6000}`));