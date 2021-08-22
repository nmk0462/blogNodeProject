const Validator = require('../Validator');

class CategoryValidator extends Validator {
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
                    name: 'required|string|max:255',
                    type: "required|string",
                    description: "string|max:1000"


                };
            case 'all_categories':
                rules = {
                    type: "string"
                }
                break;
            case 'getS3PresignedURL':
                rules={
                    file_type: 'required',
                    file_path: 'required'
                }


        }
        return rules;
    }

    allowedKeys(type, data = {}) {
        let keys = [];

        switch (type) {
            case 'create':
                keys = keys.concat([
                    'name',
                    'type',
                    'description',
                    'parent'


                ]);
                break;
            case 'all_categories':
                keys = keys.concat([
                    'type',
                    'parent'

                ]);
                break;

            case 'getS3PresignedURL':
                keys=keys.concat([
                   'file_path',
                   'file_type'
                ]);
                break;

        }
        return keys;
    }




}

module.exports = CategoryValidator;