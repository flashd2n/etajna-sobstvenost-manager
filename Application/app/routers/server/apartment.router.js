const { Router } = require('express');
const router = new Router();
// NEED AUTHORIZATION CHECK BEFORE EACH ROUTE
const attach = (app, contr) => {
    router.route('/my-apartment')
        .get((req, res) => {
            res.send('My appartment page');
        });

    router.route('/chat')
        .get((req, res) => {
            res.send('Chat page');
        });

    app.use('/', router);
};

module.exports = attach;
