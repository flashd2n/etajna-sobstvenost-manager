/* eslint-disable new-cap */

const init = (data, controllersFactory, config) => {
    const express = require('express');
    const app = express();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    // if (config.env === config.prod) {
    //     run check for db
    //     init seed, if no db
    // }

    require('./app.config').baseConfig(app);
    require('./app.config').authConfig(
        app, data.apartments, data.admin, data.db, config);
    require('./app.config').chatConfig(io);

    require('./routers').attachTo(app, controllersFactory);

    require('./app.config').errorConfig(app, controllersFactory);

    return Promise.resolve(server);
};

module.exports = { init };
