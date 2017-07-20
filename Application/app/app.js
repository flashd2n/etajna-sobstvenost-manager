const init = (data) => {
    const express = require('express');
    const app = express();

    require('./config').baseConfig(app);
    require('./config').authConfig(app, data.appartments, data.db);

    require('./routers').attachTo(app);

    return Promise.resolve(app);
};

module.exports = { init };
