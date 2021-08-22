const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {User} = require('../models');

let jwtSeekerOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: App.env.JWT_AUTH_SECRET,
};


const userStrategy = new JWTStrategy(jwtSeekerOptions, function (jwtPayload, next) {
    // usually this would be a database call:


    User.findByPk(jwtPayload.id)
        .then((seeker) => {
            if (seeker) {
                return next(null, seeker);
            } else {
                return next(null, false);
            }
        }).catch((err) => {

        return next(err);
    });

});



passport.use('userStrategy', userStrategy);
