const seedAndStartServer = () => {
    const config = require('./config');

    const { Logger } = require('../../../utils');
    const logger = new Logger(config);
    const controllers = require('../../../app/controllers');
    const { ControllersFactory } = require('../../../utils/factories');
    const validators = require('../../../app/validators');

    const models = {
        requests: require('../../../app/models/request.model'),
        apartments: require('../../../app/models/apartment.model'),
        admin: require('../../../app/models/admin.model'),
        expenses: require('../../../app/models/expense.model'),
        fees: require('../../../app/models/fee.model'),
    };

    return Promise.resolve()
        .then(() => require('../../../database').init(config.connectionString))
        .then(async (database) => {
            await require('../../../utils/seed')(database);
            return database;
        }).then((database) =>
            require('../../../app/data')
            .init(database, models, validators))
        .then((data) => {
            const controllersFactory = new ControllersFactory(controllers,
                data, logger);

            return require('../../../app')
                .init(data, controllersFactory, config);
        })
        .then((app) => {
            return app.listen(
                config.port,
                () => console.log(`Server started and `
                    + `listending on port ${config.port}`)
            );
        });
};

module.exports = seedAndStartServer;
