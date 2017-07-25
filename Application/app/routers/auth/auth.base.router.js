const { Router } = require('express');
const router = new Router();
const passport = require('passport');


const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getAuthController();

    router.route('/register')
        .get((req, res) => {
            controller.getForm(req, res);
        })
        .post((req, res) => {
            controller.register(req, res);
        });

    router.route('/login')
        .get((req, res) => {
            console.log(controller);
            controller.login(req, res);
        })
        .post(passport.authenticate('local', {
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
