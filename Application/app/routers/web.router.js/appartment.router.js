const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router.get('/my-appartment', (req, res) => {
        res.send('My appartment page');
    });

    router.get('/chat', (req, res) => {
        res.send('Chat page');
    });

    app.use('/', router);
};

module.exports = { attachTo };
