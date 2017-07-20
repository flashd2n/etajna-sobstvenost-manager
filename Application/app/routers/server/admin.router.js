const { Router } = require('express');
const router = new Router();
// NEED AUTHORIZATION CHECK BEFORE EACH ROUTE
const attach = (app) => {
    router.route('/admin')
        .get((req, res) => {
            res.send('Admin page');
        });

    router.route('/create-expense')
        .get((req, res) => {
            res.send('Create expense page');
        });

    app.use('/', router);
};

module.exports = attach;
