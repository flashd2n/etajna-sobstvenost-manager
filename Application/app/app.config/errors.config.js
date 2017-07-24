const configApp = (app, controllersFactory) => {
    const controller = controllersFactory.getErrorController();
    app.use((err, req, res, next) => {
        return controller.handleError(err, req, res, next);
    });
};

module.exports = configApp;
