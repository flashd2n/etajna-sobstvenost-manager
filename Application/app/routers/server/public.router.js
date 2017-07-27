const { Router } = require('express');
const router = new Router();


const attach = (app, controllersFactory) => {
    const controller = controllersFactory.getPublicController();

    router.route('/')
        .get(controller.home);

    // router.route('/error')
    //     .get((req, res, next) => {
    //         const error = { message: 'OOPS', code: 202 };
    //         next(new Error(JSON.stringify(error)));
    //     });

    router.route('/page-of-shame')
        .get((req, res) => {
            controller.pageOfShame(req, res);
        });

    router.route('/page-of-shame/:apartmentId')
        .get((req, res) => {
            controller.notPaidApartmentExpenses(req, res);
        });

    router.route('/expenses')
        .get(controller.currentExpense);

    router.route('/expenses/:expenseId')
        .get(controller.currentExpense);

    app.use('/', router);
};

module.exports = attach;
