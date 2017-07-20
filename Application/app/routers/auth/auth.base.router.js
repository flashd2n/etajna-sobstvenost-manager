const { Router } = require('express');
const router = new Router();
const passport = require('passport');

const attach = (app) => {
    router.route('/register')
        .get(/* controller.useOne */)
        .post(/* controller.useTwo */);

    router.route('login')
        .get(/* publicController.login */)
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
