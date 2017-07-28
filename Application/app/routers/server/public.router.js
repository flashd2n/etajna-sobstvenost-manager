const { Router } = require('express');
const router = new Router();


const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getPublicController();

    router.route('/')
        .get(controller.home);

    router.route('/page-of-shame')
        .get((req, res) => {
            controller.pageOfShame(req, res);
        });

    router.route('/page-of-shame/:apartmentId')
        .get((req, res) => {
            controller.notPaidApartmentExpenses(req, res);
        });

    router.route('/expenses')
        .get((req, res, next) => {
            controller.allExpenses(req, res, next);
        });

    router.route('/expenses/:expenseId')
        .get((req, res, next) => {
            controller.currentExpense(req, res, next);
        });

    app.use('/', router);
};

module.exports = attach;
