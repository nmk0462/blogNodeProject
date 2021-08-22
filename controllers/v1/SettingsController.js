const {SettingsTransformer} = require('../../transformers');
const BaseController = require('./BaseController');
const {SettingsService} = require('../../services');
const { red } = require('chalk');

module.exports = {

    create: async (req, res) => {


        let category = await new SettingsService(req).createCategory();
        if (category) {
            let transformedData = await BaseController.getTransformedData(req, category, SettingsTransformer);
            return res.success(transformedData);
        } else {
            res.error(category);


        }
    },


    allCategories: async (req, res) => {
        let categories = await new SettingsService(req).allCategories();
        let transformedData = await BaseController.getTransformedData(req, categories.data, SettingsTransformer);
        return res.success(transformedData);
    },



};