const {BlogController} = require('../../controllers');
const prefix = 'blog';

module.exports = {

    [`POST ${prefix}/add`]: {

        action: BlogController.create,
        name: 'api.blog.create',
        middlewares: [
            "auth.jwtSeeker"
        ]
    },

    [`GET ${prefix}`]: {
        action: BlogController.search,
        name: 'api.blog.search',
        middlewares: []
    },

    [`POST ${prefix}/update`]: {
        action: BlogController.update,
        name: 'api.blog.update',
        middlewares: [
            "auth.jwtSeeker"

        ]
    },




};