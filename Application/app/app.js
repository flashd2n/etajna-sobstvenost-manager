const init = (data, controllers, config) => {
    const express = require('express');
    const app = express();

    if (config.seed) {
        require('../utils/index').seed(data.db);
    }

    require('./app.config').baseConfig(app);
    require('./app.config').authConfig(
        app, data.appartments, data.manager, data.db, config);

    require('./routers').attachTo(app, controllers);

    require('./app.config').errorConfig(app, controllers.errorController);

    return Promise.resolve(app);
};

module.exports = { init };
