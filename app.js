const express = require('express');
const passport = require('passport');
const chalk = require('chalk');
const middlewares = require('./middlewares');
const models = require("./models");
const globals = require('./config/globals');
const Routes = require('./routes');
const ErrorHandler = require('./errors/ErrorHandler');
/**
 * Create Express server.
 */
const app = express();

/**
 * Sync Database & their Models
 */
models.sequelize.authenticate().then(function () {
    console.log(chalk.green('Nice! Database looks fine'));
}).catch(function (err) {
    console.log(chalk.red(err, "Something went wrong with the Database Update!"));
});

// Exporting globals to node environment
global['App'] = globals;

// Passport Initialisation
require('./helpers/passport');
app.use(passport.initialize());

/**
 * Common Middlewares.
 */
middlewares.general(app);
middlewares.requestInterceptor(app);
middlewares.responses(app);

// For adding user info in the global req object per session
middlewares.auth.userLogin(app);
/**
 * Loading cron jobs.
 */

/**
 * Loading providers.
 */
require('./providers');
/**
 * Primary app routes.
 */
console.log(chalk.black.bgBlue("Initialising routes..."));

for (let routerKey in Routes) {


    console.log(chalk.blue.bold(`Loading routes for prefix: ${Routes[routerKey]['prefix']}`));
    app.use(Routes[routerKey]['prefix'], Routes[routerKey]['routes']());
}

// Handling Errors (Global Handler)
app.use(ErrorHandler);

module.exports = app;