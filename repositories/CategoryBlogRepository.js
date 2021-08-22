const Models = require("../models");
const {BlogCategories} = Models;
const BaseRepository = require("./BaseRepository");

class CategoryBlogRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = BlogCategories;
    }
}

module.exports = CategoryBlogRepository;