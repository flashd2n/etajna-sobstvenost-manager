const { Router } = require('express');
const router = new Router();

const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getApartmentController();
    const authController = controllersFactory.getAuthController();

    router.route('/my-apartment')
        .get(authController.verifyLoggedUser, controller.renderMyApt);

    router.route('/chat')
        .get(authController.verifyLoggedUser, controller.renderChat);

    app.use('/', router);
};

module.exports = attach;
