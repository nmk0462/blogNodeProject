const {UserTransformer} = require('../../transformers');
const BaseController = require('./BaseController');
const {UserService} = require('../../services');
const { red } = require('chalk');

module.exports = {

    create: async (req, res) => {
        

        let user = await new UserService(req).createUser();
        if (user) {
            let transformedData = await BaseController.getTransformedData(req, user, UserTransformer);
            return res.success(transformedData);
        } else {
            res.error(user);
        

        }
    },


    login: async (req, res) => {
        let result = await new UserService(req).login();

        result.user = await BaseController.getTransformedData(req, result.user, UserTransformer);
        return result.success ? res.success(result) : res.error(result);
    },


};