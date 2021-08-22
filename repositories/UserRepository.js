const Models = require("../models");
const {User} = Models;
const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
    constructor(req) {
        super();
        this.req = req;
        this.model = User;
    }
}

module.exports = UserRepository;