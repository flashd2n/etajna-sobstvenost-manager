const { Router } = require('express');
const router = new Router();
const { AdminController } = require('../../controllers');

// NEED AUTHORIZATION CHECK BEFORE EACH ROUTE
const attach = (app, data) => {
    const controller = new AdminController(data);

    router.route('/admin')
        .get((req, res) => {
            controller.admin(req, res);
        });

    router.route('/create-expense')
        .get((req, res) => {
            controller.createExpense(req, res);
        });

    router.route('/approve-request/:request_id')
        .get((req, res) => {
            controller.approveExpense(req, res);
        });

    router.route('/reject-request/:request_id')
        .get((req, res) => {
            controller.rejectExpense(req, res);
        });

    // TODO: check if has access with some middleware
    app.use('/', router);
};

module.exports = attach;
