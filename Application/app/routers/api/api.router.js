const { Router } = require('express');
const router = new Router();

const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getApiController();
    const authController = controllerFactory.getAuthController();
    const validator = controllerFactory.getValidatorController();

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

    router.route('/alldebtors')
        .get((req, res, next) => {
            controller.getAllDebtors(req, res, next);
        });

    router.route('/currentexpenses')
        .get((req, res, next) => {
            controller.getCurrentExpenses(req, res, next);
        });

    router.route('/payfee/:aptId')
        .put(validator.validatePayFee, (req, res, next) => {
            controller.payFee(req, res, next);
        });

    router.route('/payexpense/:aptId')
        .put(validator.validatePayExpense, (req, res, next) => {
            controller.payExpense(req, res, next);
        });

    router.route('/removeapt/:aptNum')
        .delete(authController.verifyLoggedAdmin, (req, res, next) => {
            controller.removeApt(req, res, next);
        });

    app.use('/api', router);
};

module.exports = attach;
