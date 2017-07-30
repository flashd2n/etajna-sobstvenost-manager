const { Router } = require('express');
const router = new Router();
const passport = require('passport');


const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getAuthController();
    const validator = controllerFactory.getValidatorController();

    router.route('/register')
        .get((req, res) => {
            controller.getForm(req, res);
        })
        .post(validator.validateRegister, (req, res) => {
            controller.register(req, res);
        });

    router.route('/login')
        .get((req, res) => {
            controller.login(req, res);
        })
        .post(validator.validateLogin, passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    router.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.use('/', router);
};

module.exports = attach;
