const {SettingsController} = require('../../controllers');
const prefix = 'category';

module.exports = {

    [`POST ${prefix}/add`]: {

        action: SettingsController.create,
        name: 'api.category.create',
        middlewares: [
            "auth.jwtSeeker"
        ]
    },

    [`GET ${prefix}`]: {
        action: SettingsController.allCategories,
        name: 'api.category.allCategories',
        middlewares: []
    },



};