const { Router } = require('express');
const router = new Router();
const passport = require('passport');
const { PublicController } = require('../../controllers');


const attach = (app, data) => {
    const controller = new PublicController(data);

    router.route('/register')
        .get((req, res) => {
            controller.register(req, res);
        })
        .post((req, res) => {
            controller.doRegister(req, res);
        });

    router.route('/login')
        .get((req, res) => {
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