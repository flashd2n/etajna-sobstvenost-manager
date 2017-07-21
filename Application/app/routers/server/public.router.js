const { Router } = require('express');
const router = new Router();
const { PublicController } = require('../../controllers');


const attach = (app, data) => {
    const controller = new PublicController(data);

    router.route('/')
        .get(controller.home);

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
