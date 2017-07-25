const WebSocketServer = require('ws').Server;

const configApp = (config) => {
    const wss = new WebSocketServer({
        port: 4001,
    });

    wss.on('connection', (wsc) => {
        wsc.on('message', (msg) => {
            if (msg === 'exit') {
                wsc.close();
            } else {
                wss.clients.forEach((client) => {
                    client.send(msg);
                });
            }
        });
        wsc.send('Welcome to cyber chat!');
    });
};

module.exports = configApp;
