const {UserController} = require('../../controllers');
const userPrefix = 'user';

module.exports = {

    [`POST ${userPrefix}/register`]: {


        action: UserController.create,
        name: 'api.employer.create',
        middlewares: [
            "auth.jwtSeeker"
        ]
    },


    [`POST ${userPrefix}/login`]: {
        action: UserController.login,
        name: 'api.employer.login',
        middlewares: []
    },


};