const passport = require('passport');
const models = require('../models');
const JWT = require('jsonwebtoken');

module.exports = function (app) {
    passport.authenticate(['userStrategy'], {session: false}, function (err, user) {

        app.use((req, res, next) => {


            if (err) {
                return next(err);
            }

            req['auth'] = {
                isLoggedIn: !!(user),
            };

            req.auth.user = user;


            return next();

        })(req, res, next);

    });
};

