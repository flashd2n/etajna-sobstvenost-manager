const configApp = (io) => {
    io.on('connection', (socket) => {
        console.log('new connection');
    });
};

module.exports = configApp;
