const configApp = (app) => {
    const { ErrorController } = require('../controllers');
    const controller = new ErrorController();

    app.use(controller.handleError);
};

module.exports = configApp;
