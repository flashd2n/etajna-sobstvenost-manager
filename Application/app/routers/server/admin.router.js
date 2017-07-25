const { Router } = require('express');
const router = new Router();

// NEED AUTHORIZATION CHECK BEFORE EACH ROUTE
const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getAdminController();

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
            controller.approveRequest(req, res);
        });

    router.route('/reject-request/:request_id')
        .get((req, res) => {
            controller.rejectRequest(req, res);
        });

    // check if has access with some middleware
    app.use('/', router);
};

module.exports = attach;
