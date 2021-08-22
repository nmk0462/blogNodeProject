const GeneralMiddleware = require('./general');
const ResponseMacroMiddleware = require('./responses');
const RequestInterceptorMiddleware = require('./request-interceptor');
//const V1Middleware = require('./v1');
const AuthMiddleware = require('./auth');
const userLogin = require('./userLogin');

module.exports = {
    general: GeneralMiddleware,
    responses: ResponseMacroMiddleware,
    requestInterceptor: RequestInterceptorMiddleware,
    auth: {
        jwtSeeker: AuthMiddleware.jwtSeeker,
        userLogin: userLogin
    },
    
};