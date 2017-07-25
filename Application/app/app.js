const init = (data, controllersFactory, config) => {
    const express = require('express');
    const app = express();

    // if (config.env === config.prod) {
    //     run check for db
    //     init seed, if no db
    // }

    require('./app.config').baseConfig(app);
    require('./app.config').authConfig(
        app, data.apartments, data.admin, data.db, config);

    require('./routers').attachTo(app, controllersFactory);

    require('./app.config').errorConfig(app, controllersFactory);

    return Promise.resolve(app);
};

module.exports = { init };
