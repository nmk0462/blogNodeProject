const Models = require("../models");
const {Categories} = Models;
const BaseRepository = require("./BaseRepository");

class CategoryRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = Categories;
    }
}

module.exports = CategoryRepository;