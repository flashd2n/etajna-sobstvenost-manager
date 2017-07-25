const WebSocketServer = require('ws').Server;

const configApp = (config) => {
    const wss = new WebSocketServer({
        port: 4001,
    });

    wss.on('connection', (wsc) => {
        // append req.user
        wsc.on('message', (msg) => {
            if (msg === 'exit') {
                wsc.close();
            } else {
                console.log(msg); // attach req.user
                wss.clients.forEach((client) => {
                    client.send(msg);
                });
            }
        });
        // wsc.send('Welcome to Drujbai Communications!');
    });
};

module.exports = configApp;
