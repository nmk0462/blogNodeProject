const {BlogTransformer} = require('../../transformers');
const BaseController = require('./BaseController');
const {BlogService} = require('../../services');
const { red } = require('chalk');

module.exports = {

    create: async (req, res) => {


        let blog = await new BlogService(req).createBlog();
        if (blog) {
            let transformedData = await BaseController.getTransformedData(req, blog, BlogTransformer);
            return res.success(transformedData);
        } else {
            res.error(blog);


        }
    },

    update: async (req, res) => {


        let blog = await new BlogService(req).updateBlog();
        if (blog) {
            let transformedData = await BaseController.getTransformedData(req, blog, BlogTransformer);
            return res.success(transformedData);
        } else {
            res.error(blog);


        }
    },


    search: async (req, res) => {
        let blog = await new BlogService(req).search();
        let transformedData = await BaseController.getTransformedData(req, blog.data, BlogTransformer);
        return res.success(transformedData);
    },



};