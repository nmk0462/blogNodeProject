const passport = require('passport');

module.exports = {

    jwtSeeker: passport.authenticate('userStrategy', {session: false}),

};