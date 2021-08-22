const Validator = require('../Validator');

class UserValidator extends Validator {
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

            case 'signin':
                rules = {
                    email: 'required|email',
                    password: 'required|min:6'
                };
                break;

            case 'create':
                rules = {
                    name: 'required|string|max:255',
                    email: `required|unique:User,email|email`,
                    password: 'required|min:6|max:255',
                    role: 'string',
                };
                break;


        }
        return rules;
    }


    allowedKeys(type, data = {}) {
        let keys = [];

        switch (type) {
            case 'create':
                keys = keys.concat([
                    'name',
                    'email',
                    'password',
                    'role'


                ]);
                break;
            case 'signin':
                keys = keys.concat([
                    'email',
                    'password'

                ]);
                break;

        }
        return keys;
    }



}

module.exports = UserValidator;