const configApp = (app, controller) => {
    app.use((err, req, res, next) => {
        return controller.handleError(err, req, res, next);
    });
};

module.exports = configApp;
