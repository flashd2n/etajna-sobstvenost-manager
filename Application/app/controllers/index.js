module.exports = {
    PublicController: require('./server/public.controller'),
    AdminController: require('./server/admin.controller'),
    ErrorController: require('./errors/errors.controller'),
    AuthController: require('./auth/auth.controller'),
    ApiController: require('./api/api.controller'),
    ApartmentController: require('./server/apartment.controller'),
    ValidatorController: require('./validators/validator.controller'),
};
