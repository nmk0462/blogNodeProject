const {UserValidator} = require('../../validators');
const {UserRepository} = require('../../repositories');

const {Op} = require("sequelize");
const { result } = require('lodash');

class UserService {

    /**
     * Initializing common properties
     */
    constructor(req) {
        this.req = req;
        this.UserValidator = new UserValidator();

        this.UserRepository = new UserRepository(req);

    }


    async createUser() {
        let validInputs = await this.UserValidator.validate(this.req.body, "create");

        let createUser = this.UserRepository.create(validInputs);

        return createUser;
    }



    async login() {
        let validInputs = await this.UserValidator.validate(this.req.body, "signin");
        let userObj = await this.UserRepository.getBy({
            email: validInputs.email,
            is_active: true
        }, false, false);
        if (userObj) {

            let user = await userObj.comparePassword(validInputs.password);
            let token = await userObj.getJWT();
            this.UserRepository.update({
                last_login_at: new Date(),
            }, {
                where: {
                    id: userObj.dataValues.id,
                }
            });
            return {success: true, token: token, user: user}
        }
        return {success: false, message: USER_NOT_EXIST}
    }





}

module.exports = UserService;