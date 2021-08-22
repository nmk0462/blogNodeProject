const Models = require("../models");
const {Blog} = Models;
const BaseRepository = require("./BaseRepository");

class BlogRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = Blog;
    }
}

module.exports = BlogRepository;