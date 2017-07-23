const config = require('./config');
const { Logger } = require('./utils');
const logger = new Logger(config);
const controllers = require('./app/controllers');
const allControllers = {};

require('./database').init(config.connectionString)
    .then((database) => require('./app/data').init(database))
    .then((data) => {
        const errorController = new controllers.ErrorController(logger);
        const publicController = new controllers.PublicController(data);
        const adminController = new controllers.AdminController(data);

        allControllers.errorController = errorController;
        allControllers.publicController = publicController;
        allControllers.adminController = adminController;

        return require('./app').init(data, allControllers, config);
    })
    .then((app) => {
        return app.listen(
            config.port,
            () => console.log(`Server started and `
                + `listending on port ${config.port}`)
        );
    });
