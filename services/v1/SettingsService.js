const {CategoryValidator} = require('../../validators');
const {CategoryRepository} = require('../../repositories');

const {Op} = require("sequelize");
const { result } = require('lodash');

class SettingsService {

    /**
     * Initializing common properties
     */
    constructor(req) {
        this.req = req;
        this.CategoryValidator = new CategoryValidator();
        this.CategoryRepository = new CategoryRepository(req);

    }


    async createCategory() {
        let validInputs = await this.CategoryValidator.validate(this.req.body, "create");

        let createCategory = this.CategoryRepository.create(validInputs);

        return createCategory;
    }



    async allCategories() {

        let validInputs = await this.CategoryValidator.validate({...this.req.query}, "all_categories");


        return this.CategoryRepository.paginate({where:{is_active:true,...validInputs}}, null,{

                     }

                );



    }
    async getS3PreSignedUrl() {
        let validInputs = await this.CategoryValidator.validate({...this.req.body}, 'getS3PresignedURL');
        const Key = validInputs.file_path;
        const params = {
            Bucket: App.env.AWS_BUCKET_NAME,
            Key,
            Expires: parseInt(App.env.AWS_S3_PRESIGNED_URL_EXPIRY),
            ContentType: validInputs.file_type,
            ACL: 'public-read',
        };
        return {url: await App.S3Bucket.getSignedUrlPromise('putObject', params)};
    }
}

module.exports = SettingsService;