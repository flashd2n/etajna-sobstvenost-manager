const { Router } = require('express');
const router = new Router();

const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getApiController();
    const authController = controllerFactory.getAuthController();

    router.route('/getuser')
        .get(authController.verifyLoggedUser, controller.retriveUser);

    app.use('/api', router);
};

module.exports = attach;
