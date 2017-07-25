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
        .get(controller.pageOfShame);

    router.route('/page-of-shame/:appartmentId')
        .get(controller.unpaidAppartmentExpenses);

    router.route('/expenses')
        .get(controller.currentExpense);

    router.route('/expenses/:expenseId')
        .get(controller.currentExpense);

    app.use('/', router);
};

module.exports = attach;
