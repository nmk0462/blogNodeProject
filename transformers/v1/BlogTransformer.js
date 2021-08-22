const BaseTransformer = require('../BaseTransformer');
const {Blog} = require('../../models');
const {BlogRepository} = require('../../repositories');
const {UserRepository} = require('../../repositories');

class BlogTransformer extends BaseTransformer {

    constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.BlogRepository = new BlogRepository(req);
        this.UserRepository = new UserRepository(req);

        this.model = Blog;
    }

    async transform(blog) {
        blog = await blog;
        let returnVal = App.helpers.cloneObj({
            main_image:blog.main_image,
            heading: blog.heading,
            large_description:blog.large_description,
            small_description:blog.small_description,
            created_by:await this.includeCreator(blog.created_by),
            is_active:blog.is_active,
            created_at:blog.created_at,
            modified_at:blog.modified_at



        });

        return returnVal;
    }

    includeCreator(data) {
        if (data){
            return this.UserRepository.get(data);
        }
        return null;
    }


}

module.exports = BlogTransformer;