const { Router } = require('express');
const { PublicController } = require('../controllers/public.controller.js');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const publicController = new PublicController(data);

    router.get('/', (req, res) => {
        publicController.home(req, res);
    });

    router.get('/page-of-shame', (req, res) => {
        publicController.pageOfShame(req, res);
    });

    router.get('/unpaid-appartment-expenses/:appartmentId', (req, res) => {
        publicController.unpaidAppartmentExpenses(req, res);
    });

    router.get('/current-expenses', (req, res) => {
        publicController.currentExpenses(req, res);
    });

    router.get('/current-expenses/:expenseId', (req, res) => {
        publicController.currentExpense(req, res);
    });

    router.get('/sign-up', (req, res) => {
        publicController.signUp(req, res);
    });

    router.get('/login', (req, res) => {
        publicController.login(req, res);
    });

    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
    }));

    app.use('/', router);
};

module.exports = { attachTo };
