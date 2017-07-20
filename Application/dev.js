const config = require('./config.distr');

require('./database').init(config.connectionString)
    .then((database) => {
        return require('./app/data').init(database);
    })
    .then((data) => {
        return require('./app').init(data);
    })
    .then((app) => {
        return app.listen(
            config.port,
            () => console.log(`Server started and `
                + `listending on port ${config.port}`)
        );
    })
    .catch((err) => {
        console.log(`Initialization error: ${err.message}`);
    });
