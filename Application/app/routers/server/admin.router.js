const { Router } = require('express');
const router = new Router();

const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getAdminController();
    const authController = controllersFactory.getAuthController();

    router.route('/admin')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.renderPage(req, res);
        });

    router.route('/complete-expense/:expense_id')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.completeExpense(req, res);
        });

    router.route('/cancel-expense/:expense_id')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.cancelExpense(req, res);
        });

    router.route('/create-expense')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.renderCreateExpenseForm(req, res);
        })
        .post(authController.verifyLoggedAdmin, (req, res) => {
            controller.createExpense(req, res);
        });

    router.route('/admin/add-monthly-fee')
        .post(authController.verifyLoggedAdmin, (req, res) => {
            controller.addMonthlyFee(req, res);
        });

    router.route('/approve-request/:request_id')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.approveRequest(req, res);
        });

    router.route('/reject-request/:request_id')
        .get(authController.verifyLoggedAdmin, (req, res) => {
            controller.rejectRequest(req, res);
        });

    app.use('/', router);
};

module.exports = attach;
