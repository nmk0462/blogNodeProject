const Validator = require('../Validator');

class BlogValidator extends Validator {
    /**
     * Validation rules.
     *
     * @param  string type
     * @param  array data
     * @return Object
     */

    getRules(type, data = {}) {

        let rules = {};

        switch (type) {

            case 'create':
                rules = {
                    heading: 'string|max:255',
                    small_description: "string",
                    large_description: "string"


                };
            case 'update':
                rules = {
                    heading: 'string|max:255',
                    small_description: "string",
                    large_description: "string"


                };
            case 'search':
                rules = {
                    heading: "string"
                }
                break;



        }
        return rules;
    }

    allowedKeys(type, data = {}) {
        let keys = [];

        switch (type) {
            case 'create':
                keys = keys.concat([
                    'main_image',
                    'heading',
                    'large_description',
                    'small_description',
                    'created_by',
                    'is_active',
                    'categories',
                    'sub_categories'


                ]);
                break;

            case 'update':
                keys = keys.concat([
                    'main_image',
                    'heading',
                    'large_description',
                    'small_description',
                    'created_by',
                    'is_active',
                    'categories',
                    'sub_categories'


                ]);
                break;
            case 'search':
                keys = keys.concat([
                    'heading',
                    'created_by',
                    'created_at',
                    'id'

                ]);
                break;


        }
        return keys;
    }




}

module.exports = BlogValidator;