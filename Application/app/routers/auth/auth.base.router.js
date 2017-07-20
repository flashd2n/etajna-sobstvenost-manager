const { Router } = require('express');
const router = new Router();
const passport = require('passport');

const attach = (app) => {
    router.route('/register')
        .get((req, res) => {
            res.send(true);
        })
        .post(/* controller.useTwo */);

    router.route('/login')
        .get((req, res) => {
            res.send(true);
        })
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
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
