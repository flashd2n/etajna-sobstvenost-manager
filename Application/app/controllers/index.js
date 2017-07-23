module.exports = {
    PublicController: require('./server/public.controller').PublicController,
    AdminController: require('./server/admin.controller').AdminController,
    ErrorController: require('./errors/errors.controller').ErrorController,
};
