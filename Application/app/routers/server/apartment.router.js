const { Router } = require('express');
const router = new Router();

const attach = (app, controllersFactory) => {
    const authController = controllersFactory.getAuthController();

    router.route('/my-apartment')
        .get(authController.verifyLoggedUser, (req, res) => {
            res.send('My appartment page');
        });

    router.route('/chat')
        .get(authController.verifyLoggedUser, (req, res) => {
            res.render('chat');
        });

    app.use('/', router);
};

module.exports = attach;
