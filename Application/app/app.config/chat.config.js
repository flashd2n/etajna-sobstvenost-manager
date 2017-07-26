const configApp = (io) => {
    const users = [];

    io.on('connection', (socket) => {
        console.log('new connection');

        socket.on('join', (data) => {
            socket.username = data.username;
            const userObj = {
                username: data.username,
                socketId: socket.id,
            };
            users.push(userObj);
            io.emit('all-users', users);
        });

        socket.on('disconnect', () => {
            console.log('BYEEE');
        });
    });
};

module.exports = configApp;
