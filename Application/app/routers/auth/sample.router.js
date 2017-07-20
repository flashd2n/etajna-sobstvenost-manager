const { Router } = require('express');
const router = new Router();

const attach = (app) => {
    router.route('/')
        .get(controller.useOne)
        .post(controller.useTwo);

    app.use('/awesome-ness', router);
};

module.exports = attach;
