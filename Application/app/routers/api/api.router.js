const { Router } = require('express');
const router = new Router();

const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getApiController();
    const authController = controllerFactory.getAuthController();

    router.route('/getuser')
        .get(authController.verifyLoggedUser, controller.retriveUser);

    router.route('/notpaidfees/:id')
        .get((req, res, next) => {
            controller.getNotPaidFeesById(req, res, next);
        });

    router.route('/notpaidexpenses/:id')
        .get((req, res, next) => {
            controller.getNotPaidExpensesById(req, res, next);
        });

    app.use('/api', router);
};

module.exports = attach;
