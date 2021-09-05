const express = require('express');
const controllers = require('./controllers');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('../swagger/swagger.config');
const app = express();

const specs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use('/api', controllers);
app.use('/api-explorer', swaggerUI.serve, swaggerUI.setup(specs));
app.use(passport.initialize());


module.exports = app;

