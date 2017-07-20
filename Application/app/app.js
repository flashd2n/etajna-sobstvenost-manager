const init = (data) => {
    const express = require('express');
    const app = express();

    require('./app.config').baseConfig(app);
    require('./app.config').authConfig(app, data.appartments, data.db);

    require('./routers').attachTo(app);

    return Promise.resolve(app);
};

module.exports = { init };
