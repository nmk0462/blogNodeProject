const {BlogValidator} = require('../../validators');
const {BlogRepository,CategoryBlogRepository} = require('../../repositories');

const {Op} = require("sequelize");
const { result } = require('lodash');

class BlogService {

    /**
     * Initializing common properties
     */
    constructor(req) {
        this.req = req;
        this.BlogValidator = new BlogValidator();
        this.BlogRepository = new BlogRepository(req);
        this.CategoryBlogRepository = new CategoryBlogRepository(req);

    }


    async createBlog() {
        let blog_categories = this.req.body.categories
        let blog_sub_categories=this.req.body.sub_categories
        let validInputs = await this.BlogValidator.validate(this.req.body, "create");
        let createBlog = await this.BlogRepository.create(validInputs);
        for (let data = 0; data < blog_categories.length; data++) {
             let myObj = {"blog_id":createBlog.id, "category_id":blog_categories[data]};

            let createCategory = await this.CategoryBlogRepository.create(myObj);
    }
        for (let data = 0; data < blog_sub_categories.length; data++) {
            let myObj = {"blog_id":createBlog.id, "category_id":blog_sub_categories[data]};

            let createSubCategory = await this.CategoryBlogRepository.create(myObj);
        }




        return createBlog;
    }

    async updateBlog() {
        let validInputs = await this.BlogValidator.validate(this.req.body, "update");
        let category_data = await this.CategoryBlogRepository.update({is_active: false}, {
            where: {
                blog_id: this.req.query.id,
                is_active: true
            }
        });
        await this.BlogRepository.update(validInputs, {where: {id: this.req.query.id, is_active: true}});
        let blog_categories_update = this.req.body.categories
        console.log(this.req.body)
        let blog_sub_categories_update=this.req.body.sub_categories
        for (let data = 0; data < blog_categories_update.length; data++) {
            let myObj = {"blog_id":this.req.query.id, "category_id":blog_categories_update[data]};

            let updateCategory = await this.CategoryBlogRepository.create(myObj);
        }
        for (let data = 0; data < blog_sub_categories_update.length; data++) {
            let myObj = {"blog_id":this.req.query.id, "category_id":blog_sub_categories_update[data]};

            let updateSubCategory = await this.CategoryBlogRepository.create(myObj);
        }
        return this.BlogRepository.get(this.req.query.id, false);
    }



    async search() {

        let validInputs = await this.BlogValidator.validate({...this.req.query}, "search");
         let category_blog = this.req.query.category_id;
         console.log(category_blog)
        let ids=[]

        if (category_blog) {
             var blog_id_data = await this.CategoryBlogRepository.all({where: {category_id: category_blog,is_active:true}})
             for(let data=0; data < blog_id_data.length; data++){
                 ids.push(blog_id_data[data].blog_id)

             }
             console.log(ids)
            return this.BlogRepository.paginate({where:{id: {[Op.in]: ids},is_active:true,...validInputs}}, null,{

                }

            );
         }

        return this.BlogRepository.paginate({where:{is_active:true,...validInputs}}, null,{

            }

        );

    }




}

module.exports = BlogService;