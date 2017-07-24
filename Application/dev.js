const config = require('./config');
const { Logger } = require('./utils');
const logger = new Logger(config);
const controllers = require('./app/controllers');
const { ControllersFactory } = require('./utils/factories');
const validators = require('./app/validators');

require('./database').init(config.connectionString)
    .then((database) => require('./app/data').init(database, validators))
    .then((data) => {
        const controllersFactory = new ControllersFactory(controllers,
            data, logger);

        return require('./app').init(data, controllersFactory, config);
    })
    .then((app) => {
        return app.listen(
            config.port,
            () => console.log(`Server started and `
                + `listending on port ${config.port}`)
        );
    });
