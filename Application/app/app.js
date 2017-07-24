const init = (data, controllersFactory, config) => {
    const express = require('express');
    const app = express();

    if (config.seed) {
        require('../utils/index').seed(data.db);
    }

    require('./app.config').baseConfig(app);
    require('./app.config').authConfig(
        app, data.appartments, data.manager, data.db, config);

    require('./routers').attachTo(app, controllersFactory);

    require('./app.config').errorConfig(app, controllersFactory);

    return Promise.resolve(app);
};

module.exports = { init };
