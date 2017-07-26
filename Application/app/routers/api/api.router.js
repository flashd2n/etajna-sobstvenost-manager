const { Router } = require('express');
const router = new Router();

const attach = (app, controllerFactory) => {
    const controller = controllerFactory.getApiController();

    router.route('/getusername')
        .get(controller.retriveUser);

    app.use('/api', router);
};

module.exports = attach;
