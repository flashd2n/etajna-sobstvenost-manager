const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router.get('/admin', (req, res) => {
        res.send('Admin page');
    });

    router.get('/create-expense', (req, res) => {
        res.send('Create expense page');
    });

    app.use('/', router);
};

module.exports = { attachTo };
