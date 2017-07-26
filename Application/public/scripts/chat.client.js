/* globals io, $ */
'use strict';

(() => {
    $.ajax({
        url: '/api/getuser',
        success: (res) => {
            success(res);
        },
        error: (err) => {
            error(err);
        },
        type: 'GET',
    });

    const success = (user) => {
        let users = [];
        const username = user.username;
        // const aptNum = user.number;
        // const userType = user.type;
        // const userId = user._id;

        const socket = io.connect();
        socket.emit('join', {
            username,
        });
        socket.on('all-users', (data) => {
            users = data.filter((u) => u.username !== username);
            // visualize users
            console.log(users);
            console.log(data);
            users.forEach((u) => {
                $('#users').append(u.username);
            });
        });
    };

    const error = (err) => {
        console.log(err);
    };
})();
