const { Router } = require('express');
const router = new Router();

const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getApartmentController();
    const authController = controllersFactory.getAuthController();

    router.route('/apartment/:id')
        .get(authController.verifyLoggedUser, (req, res, next) => {
            controller.renderMyApt(req, res, next);
        });

    router.route('/chat')
        .get(authController.verifyLoggedUser, controller.renderChat);

    app.use('/', router);
};

module.exports = attach;
