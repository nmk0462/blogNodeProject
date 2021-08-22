const BaseTransformer = require('../BaseTransformer');
const {Categories} = require('../../models');
const {CategoryRepository} = require('../../repositories');


class SettingsTransformer extends BaseTransformer {

    constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.CategoryRepository = new CategoryRepository(req);

        this.model = Categories;
    }

    async transform(categories) {
        categories = await categories;
        let returnVal = App.helpers.cloneObj({
            type: categories.type,
            name:categories.name,
            image:categories.image,
            description:categories.description,
            parent:await this.includeCategory(categories.parent),
            is_active:categories.is_active,
            created_at:categories.created_at,
            modified_at:categories.modified_at



        });

        return returnVal;
    }

    includeCategory(data) {
        if (data){
        return this.CategoryRepository.get(data);
        }
        return null;
    }

}

module.exports = SettingsTransformer;