let users = [];

const configApp = (io) => {
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

        socket.on('get-users', () => {
            io.emit('all-users', users);
        });

        socket.on('send-message', (data) => {
            const message = `${data.username}: ${data.message}`;
            io.emit('message-received', {
                message,
            });
        });

        socket.on('disconnect', () => {
            users = users.filter((u) => {
                return u.username !== socket.username;
            });
            io.emit('all-users', users);
        });
    });
};

module.exports = configApp;
